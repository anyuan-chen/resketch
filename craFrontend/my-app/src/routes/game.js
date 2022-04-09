import React from "react";
import { SocketAPI } from "../utils/socketapi";

export default function Game() {
  const server = new SocketAPI();
  // watch the following for server changes:
  /*
   * server.users
   * server.guild_id
   * server.currentRound
   * server.totalRounds
   * server.victories
   * server.images
   * server.confidences
   * server.currentWord
   */
  return <div>Game</div>;
}
