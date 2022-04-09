import { WebSocket, WebSocketServer } from "ws";
import crypto from "crypto";
import { Guild } from "./state";
import { randomGuildId } from "./utils/rng";
import { createError } from "./utils/errors";
import { Event, User } from "./types";

const DEFAULT_NUM_ROUNDS = 5;

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
  };

  const url = new URL(req.url ?? "", `http://${req.headers.host}`);
  const guildHash = url.searchParams.get("guild");
  const rounds =
    parseInt(url.searchParams.get("rounds") || "0") || DEFAULT_NUM_ROUNDS;

  if (url.pathname.endsWith("/join")) {
    // add to existing guild
    if (!guildHash) {
      socket.send(JSON.stringify(createError("MissingGuildField")));
      return socket.close();
    }
    if (!guilds[guildHash]?.alive) {
      socket.send(JSON.stringify(createError("GuildNotFound")));
      return socket.close();
    }
  } else if (url.pathname.endsWith("/host")) {
    // create new game
    newUser.isHost = true;
    if (guildHash) {
      socket.send(JSON.stringify(createError("ExtraGuildParam")));
      return socket.close();
    }

    let newGuildId;
    do {
      newGuildId = randomGuildId();
    } while (guilds[newGuildId]?.alive);

    console.log(`Created guild ${newGuildId}`);
    guilds[newGuildId] = new Guild(newGuildId, rounds);
    guilds[newGuildId].addUser(newUser);
  }
});
console.log("WebSocket server started");
console.log("Probably at ws://localhost:8080/ for dev");
