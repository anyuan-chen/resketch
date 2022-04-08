import { WebSocket } from "ws";

interface User {
  id: string;
  name: string;
  socket: WebSocket;
}

interface Event {
  event: string;
}

interface UserEvent extends Event {
  event: "user_update";
  users: { name: string; id: string }[];
}
