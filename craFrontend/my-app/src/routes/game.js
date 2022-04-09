import React, { Component } from "react";

const API_ENDPOINT = "ws://localhost:8080";

const url = new URL(window.location.href);
const client = new WebSocket(
  `${API_ENDPOINT}${url.pathname}?guild=${url.searchParams.get(
    "guild"
  )}&rounds=${url.searchParams.get("rounds")}`
);

const name = url.searchParams.get("name");

export default class Game extends Component {
  state = {
    users: [],
    guild_id: 0,
    currentRound: 1,
    totalRounds: 3,
    victories: {}, // uuid: int
    images: {}, // uuid: base64 encoded string
    confidences: {}, // uuid: decimal percentage (0 <= x <= 1)
    wordHistory: [],
  };

  send(object) {
    client.send(JSON.stringify(object));
  }

  componentDidMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      if (name) {
        this.send({ action: "set_profile", name: name });
      }
    };

    client.onmessage = (e) => {
      const event = e.data;
      console.log(event);
      this.setState((state) => ({
        ...this.state,
        users: client.users,
      }));
    };
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
