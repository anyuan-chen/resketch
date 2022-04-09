import { Action, Event, NewRoundEvent, User, UserEvent } from "./types";
import wordlist from "./data/wordlist.json";

export class Guild {
  users: User[] = [];
  rounds = 0;
  alive = true;
  id: string;
  game: GameManager;

  constructor(id: string, rounds: number) {
    this.rounds = rounds;
    this.id = id;
    this.game = new GameManager(rounds);
  }

  addUser(user: User) {
    this.users.push(user);
    console.log(`User joined, now ${this.users.length}`);

    this.configureUser(user);
    this.fireEventAll(this.generateUserEvent());
  }

  configureUser(user: User) {
    // on receive
    user.socket.on("message", (msg) => {
      try {
        const data: Action = JSON.parse(msg.toString());
        switch (data.action) {
          case "set_profile":
            if (!data.name) {
              return user.error("MissingName");
            }
            user.name = data.name;
            this.fireEventAll(this.generateUserEvent());
            return;
          case "draw":
            if (!data.image) {
              return user.error("MissingImage");
            }
            return;
          case "finished":
            this.game.markFinished(user);
            if (this.users.every((u) => this.game.userFinished[u.id])) {
              // if everyone is done go next round
              if (this.game.startNextRound()) {
                this.fireEventAll(
                  this.generateNewRoundEvent(this.game.activeWord)
                );
              }
            }
            return;
          case "begin":
            if (user.isHost) {
              this.game.beginRound();
              this.fireEventAll(
                this.generateNewRoundEvent(this.game.activeWord)
              );
            } else {
              user.error("HostOnlyCommand");
            }
            return;
          case undefined:
          case null:
            return user.error("MissingAction");
        }
      } catch (SyntaxError) {
        return user.error("MalformedJSON");
      }
    });

    // for quitting
    user.socket.on("close", () => {
      this.users = this.users.filter((s) => s.id !== user.id);
      console.log(`User left, now ${this.users.length}`);

      if (user.isHost) {
        if (this.users.length !== 0) {
          this.users[0].isHost = true;
        }

        console.log("Host left, finding new host");
      }

      this.fireEventAll(this.generateUserEvent());

      if (this.users.length === 0) {
        this.alive = false;
        console.log(`All members left, shutting down guild ${this.id}`);
      }
    });
  }

  fireEventAll(event: Event) {
    for (const u of this.users) {
      u.send(event);
    }
  }

  generateUserEvent(): UserEvent {
    return {
      event: "user_update",
      guild_id: this.id,
      users: this.users.map((e) => {
        return { id: e.id, name: e.name, isHost: e.isHost };
      }),
    };
  }

  generateNewRoundEvent(word: string): NewRoundEvent {
    return {
      event: "new_round",
      word: word,
    };
  }
}

class GameManager {
  activeWord = "";
  images: { [key: string]: string } = {}; // uuid: base64 png
  currentRound = 1;
  totalRounds: number;
  wordHistory: string[] = [];
  roundOver = false;
  userFinished: { [key: string]: boolean } = {}; // uuid: if ready

  constructor(rounds: number) {
    this.totalRounds = rounds;
  }

  markFinished(user: User) {
    this.userFinished[user.id] = true;
  }

  setImage(user: User, image: string) {
    this.images[user.id] = image;
    // TODO: call api, etc, etc, fancy stuff here
  }

  startNextRound(): boolean {
    // TODO: return true if ok, send new word event
    // return false if we're done, this is the last one
    this.currentRound++;
    this.wordHistory.push(this.activeWord);
    if (this.currentRound <= this.totalRounds) {
      this.beginRound();
      return true;
    }
    return false;
  }

  beginRound() {
    // fetch new unique word
    let newWord: string;
    do {
      // equiv to python's random.choice
      newWord = wordlist[(wordlist.length * Math.random()) | 0];
    } while (this.wordHistory.includes(newWord));
    this.activeWord = newWord;
  }
}
