// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";      // Main entry
import MeditationApp from "./MeditationApp.jsx";  // Premium session UI

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<MeditationApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
<h1 style={{ color: "red", textAlign: "center" }}>
  🚨 LIVE TEST — It Works! 🚨
</h1>
