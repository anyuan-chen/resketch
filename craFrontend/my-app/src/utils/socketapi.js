const API_ENDPOINT = "wss://api.eggworld.tk/sketch";

export class SocketAPI {
  users = [];
  guild_id = 0;
  currentRound = 1;
  totalRounds = 3;
  constructor() {
    const url = new URL(window.location.href);
    this.socket = new WebSocket(
      `${API_ENDPOINT}${url.pathname}?guild=${url.searchParams.get(
        "guild"
      )}&rounds=${url.searchParams.get("rounds")}`
    );
    this.name = url.searchParams.get("name");

    this.socket.addEventListener("open", () => {
      if (this.name) {
        this.sendUserAction(this.name);
      }
    });

    this.socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      switch (data.event) {
        case "user_update":
          this.users = data.users;
          this.guild_id = data.guild_id;
          return;
        case "new_round":
          this.currentRound++;
          this.totalRounds = event.total_rounds;
          return;
        case "draw":
          //shit
          return;
        case "victory":
          return;
        default:
          console.log("invalid server event?", data);
      }
    });
  }

  sendUserAction(newName) {
    this.send({
      action: "set_profile",
      name: newName,
    });
  }

  send(object) {
    console.log(object);
    this.socket.send(JSON.stringify(object));
  }
}
