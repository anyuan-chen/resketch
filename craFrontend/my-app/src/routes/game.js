import React from "react";

export default function Game() {
  const ws = new WebSocket("ws://localhost:8080/");
  ws.onopen = () => {
    console.log("connected");
  };
  ws.onmessage = (msg) => {
    console.log("message recieved");
  };
  return <div>Game</div>;
}
