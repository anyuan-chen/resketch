import React from "react";
import Lobby from "../components/lobby";
import Canvas from "../components/canvas";
import Leaderboard from "../components/leaderboard";
import AnswerResults from "../components/answerResults";

export default function Play() {
  var exampleSocket = new WebSocket("ws://localhost:8080/");

  const [stage, setStage] = useState("lobby");
  const ActiveComponent = <Lobby></Lobby>;
  useEffect(() => {});
  return <div>Play</div>;
}
