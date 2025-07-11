import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainApp from "./MeditationApp.jsx"; // ✅ correct component name

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
