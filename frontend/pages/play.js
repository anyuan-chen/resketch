import React from "react";
import Lobby from "../components/lobby";
import Canvas from "../components/canvas";
import Leaderboard from "../components/leaderboard";
import AnswerResults from "../components/answerResults";

export default function Play() {
  var exampleSocket = new WebSocket("wss://api.eggworld.tk/sketch/");
  const [stage, setStage] = React.useState("lobby");
  const ActiveComponent = <Lobby></Lobby>;
  useEffect(() => {});
  return <div>Play</div>;
}
