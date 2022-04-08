import { Event, User, UserEvent } from "./types";

class State {
  users: User[] = [];
  constructor() {
    console.log(this.users);
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
      this.fireEventAll(this.generateUserEvent());
    });
  }

  fireEventAll(event: Event) {
    for (const u of this.users) {
      u.socket.send(JSON.stringify(event));
    }
  }

  generateUserEvent(): UserEvent {
    return {
      event: "user_update",
      users: this.users.map((e) => {
        return { id: e.id, name: e.name };
      }),
    };
  }
}

const globalState = new State();

export default globalState;
