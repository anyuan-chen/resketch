import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import "./index.css";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play"></Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
