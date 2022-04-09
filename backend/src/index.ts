import { WebSocket, WebSocketServer } from "ws";
import crypto from "crypto";
import globalState from "./state";

const server = new WebSocketServer({ port: 8080 });

server.on("connection", (socket) => {
  const newUser = {
    socket: socket,
    id: crypto.randomUUID(),
    name: "Unnamed",
  };
  globalState.addUser(newUser);
});

console.log("WebSocket server started");
console.log("Probably at ws://localhost:8080 for dev");
