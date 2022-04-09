import { WebSocket } from "ws";

interface User {
  id: string;
  name: string;
  socket: WebSocket;
  send: (event: Event) => void;
  isHost?: boolean;
}

interface Event {
  event: string;
}

interface UserEvent extends Event {
  event: "user_update";
  guild_id: string;
  users: { name: string; id: string }[];
}

interface ImageResults {
  label: string;
  confidence: number;
}
