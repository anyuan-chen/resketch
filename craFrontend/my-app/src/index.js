import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Game from "./routes/game";
import "./index.css";
import React from "react";
import Canvas from "./components/canvas";

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(
  <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<Game />}></Route>
        <Route path="/join" element={<Game />}></Route>
        <Route path="/test" element={<Canvas/>}></Route>
      </Routes>
    </BrowserRouter>
    </React.Fragment>
);
