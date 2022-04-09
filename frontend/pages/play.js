import React, { useEffect } from "react";
import Lobby from "../components/lobby";
import Canvas from "../components/canvas";
import Leaderboard from "../components/leaderboard";
import AnswerResults from "../components/answerResults";
export default function Play() {
  var exampleSocket = new WebSocket("wss://api.eggworld.tk/sketch/");
  useEffect(() => {
    exampleSocket.onopen = () => {
      console.log("connected");
    };
    exampleSocket.onmessage = () => {
      console.log("message");
    };
  }, []);

  const [stage, setStage] = React.useState("lobby");
  const ActiveComponent = <Lobby></Lobby>;
  return <div>Play</div>;
}
