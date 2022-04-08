import { WebSocket, WebSocketServer } from "ws";
import globalState from "./state";

const server = new WebSocketServer({ port: 8080 });

let sockets: WebSocket[] = [];
server.on("connection", (socket) => {
  sockets.push(socket);

  // on receive
  socket.on("message", (msg) => {
    console.log(msg.toString());
  });

  // remove socket on disconnect
  socket.on("close", () => {
    sockets = sockets.filter((s) => s !== socket);
  });
});

console.log("WebSocket server started");
console.log("Probably at ws://localhost:8080 for dev");
