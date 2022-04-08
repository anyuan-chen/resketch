import { WebSocket, WebSocketServer } from "ws";

const server = new WebSocketServer();

let sockets: WebSocket[] = [];
server.on("connection", (socket) => {
  sockets.push(socket);

  // on receive
  socket.on("message", (msg) => {});

  // remove socket on disconnect
  socket.on("close", () => {
    sockets = sockets.filter((s) => s !== socket);
  });
});
