import React, { Component } from "react";
import Lobby from "../components/lobby";
import AnswerResults from "../components/answerResults";
import Canvas from "../components/canvas";
import Leaderboard from "../components/leaderboard";

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
    users: ["poop scoop"],
    guild_id: 0,
    currentRound: 1,
    totalRounds: 3,
    victories: {}, // uuid: int
    images: {}, // uuid: base64 encoded string
    confidences: {}, // uuid: decimal percentage (0 <= x <= 1)
    wordHistory: [],
    stage: "lobby",
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
      const data = JSON.parse(e.data);
      console.log(data);
      this.setState((state) => {
        const newState = { ...this.state };
        switch (data.event) {
          case "user_update":
            newState.users = data.users;
            newState.guild_id = data.guild_id;
            for (const u of newState.users) {
              if (!newState.victories.hasOwnProperty(u.id)) {
                // if not present in leaderboard
                newState.victories[u.id] = 0;
              }
              if (!newState.confidences.hasOwnProperty(u.id)) {
                // if not present in confidences
                newState.confidences[u.id] = 0;
              }
            }
            break;
          case "new_round":
            newState.stage = "canvas";
            newState.currentRound++;
            newState.wordHistory.push(data.word);
            newState.totalRounds = data.total_rounds;
            break;
          case "draw":
            data.images.forEach(({ user_id, content, confidence }) => {
              newState.images[user_id] = content;
              newState.confidences[user_id] = confidence;
            });
            break;
          case "victory":
            newState.leaderboard[data.victor_user_id]++;
            break;
          default:
            console.log("invalid server event?", data);
        }
        return newState;
      });
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
    if (this.state.stage === "lobby") {
      return <Lobby client={client} players={this.state.users}></Lobby>;
    } else if (this.state.stage === "canvas") {
      return <Canvas client={client}></Canvas>;
    } else if (this.state.stage === "answer") {
      return <AnswerResults client={client}></AnswerResults>;
    } else if (this.state.stage === "leaderboard") {
      return <Leaderboard client={client}></Leaderboard>;
    } else {
      return <div>something is wrong!</div>;
    }
  }
}
