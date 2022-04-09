import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/play">
          <div>fd</div>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
