import { WebSocket, WebSocketServer } from "ws";
import crypto from "crypto";
import { Guild } from "./state";
import { randomGuildId } from "./utils/rng";
import { ErrorEvent, Event, User } from "./types";
import { parse } from "url";
import { NUM_ROUNDS } from "./data/defaults";

const guilds: { [key: string]: Guild } = {};
const server = new WebSocketServer({ port: 8080 });

server.on("connection", (socket, req) => {
  const newUser: User = {
    socket: socket,
    id: crypto.randomUUID(),
    name: "Unnamed",
    send(event: Event) {
      this.socket.send(JSON.stringify(event));
    },
    error(msg: string) {
      const errorEvent: ErrorEvent = { event: "error", error: msg };
      this.send(errorEvent);
    },
  };

  const url = new URL(`http://${req.headers.host}${req.url}`);
  console.log(url);
  const guildHash = url.searchParams.get("guild");
  const rounds = parseInt(url.searchParams.get("rounds") || "0") || NUM_ROUNDS;
  if (url.pathname.endsWith("/join")) {
    // add to existing guild
    if (!guildHash) {
      newUser.error("MissingGuildField");
      return socket.close();
    }
    if (!guilds[guildHash]?.alive) {
      newUser.error("GuildNotFound");
      return socket.close();
    }
  } else if (url.pathname.endsWith("/host")) {
    // create new game
    newUser.isHost = true;
    let newGuildId;
    do {
      newGuildId = guildHash || randomGuildId();
    } while (guilds[newGuildId]?.alive);

    console.log(`Created guild ${newGuildId}`);

    guilds[newGuildId] = new Guild(newGuildId, rounds);
    guilds[newGuildId].addUser(newUser);
  }
});
console.log("WebSocket server started");
console.log("Probably at ws://localhost:8080/ for dev");
