
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import MeditationApp from "./MeditationApp.jsx"; // Make sure this path and file exist

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<MeditationApp />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
