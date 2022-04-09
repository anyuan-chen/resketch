import React, { Component } from "react";

const API_ENDPOINT = "ws://localhost:8080";

const url = new URL(window.location.href);
const client = new WebSocket(
  `${API_ENDPOINT}${url.pathname}?guild=${url.searchParams.get(
    "guild"
  )}&rounds=${url.searchParams.get("rounds")}`
);

export default class Game extends Component {
  state = {
    users: ["react", "sucks"],
  };
  componentDidMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      this.setState((state) => ({
        users: client.users
      }));
    };
    client.onmessage = () => {};
  }

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
  render() {
    return <div>{JSON.stringify(this.state.users)}</div>;
  }
}
