import { WebSocket } from "ws";

interface User {
  id: string;
  name: string;
  socket: WebSocket;
  send: (event: Event) => void;
  error: (msg: string) => void;
  isHost?: boolean;
}

interface ImageResults {
  label: string;
  confidence: number;
}

interface Event {
  event: string;
}

interface ImageResult {
  confidence: number;
  label: string;
}

interface UserEvent extends Event {
  event: "user_update";
  guild_id: string;
  users: { name: string; id: string }[];
}

interface NewRoundEvent extends Event {
  event: "new_round";
  word: string;
}

interface VictoryEvent extends Event {
  event: "victory";
  victor_user_id: string;
}

interface ErrorEvent extends Event {
  event: "error";
  error: string;
}

interface Action {
  action: string;
  name?: string;
  image?: string;
}
interface SetProfileAction {
  action: "set_profile";
  name: string;
}

interface UpdateImageAction {
  action: "draw";
  image: string;
}

interface StartAction {
  action: "begin";
}

interface ReadyAction {
  action: "finished";
}
interface Query {
  locations: string[];
  properties: string[];
} // locations: [],
// properties: [],
// mid: '/m/02wbm',
// locale: '',
// description: 'Food',
// score: 0.9611189961433411,
// confidence: 0,
// topicality: 0.9611189961433411,
// boundingPoly: null
