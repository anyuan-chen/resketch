import React from "react";
import { SocketAPI } from "../utils/socketapi";

export default function Game() {
  const server = new SocketAPI();
  return <div>Game</div>;
}
