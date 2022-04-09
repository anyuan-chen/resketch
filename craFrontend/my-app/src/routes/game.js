import React from "react";

export default function Game() {
  const url = new URL(window.location.href);
  const socket = new WebSocket(
    `ws://localhost:8080?url=${url.searchParams.get(
      "guild"
    )}&rounds=${url.searchParams.get("3")}`
  );
  socket.addEventListener("open", function (event) {
    socket.send("Hello Server!");
  });
  socket.addEventListener("message", function (event) {
    console.log("Message from server ", event.data);
  });
  return <div>Game</div>;
}
