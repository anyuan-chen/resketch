import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Game from "./routes/game";
import "./index.css";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/host" element={<Game />}></Route>
      <Route path="/join" element={<Game />}></Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
