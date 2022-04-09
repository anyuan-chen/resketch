import { Event, User, UserEvent } from "./types";

export class Guild {
  users: User[] = [];
  rounds = 0;
  alive = true;
  id: string;
  constructor(id: string, rounds: number) {
    this.rounds = rounds;
    this.id = id;
  }

  addUser(user: User) {
    this.users.push(user);
    console.log(`User joined, now ${this.users.length}`);

    this.configureUser(user);
    this.fireEventAll(this.generateUserEvent());
  }

  configureUser(user: User) {
    // on receive
    user.socket.on("message", (msg) => {});

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
}
