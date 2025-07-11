// src/mainapp.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainApp = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Idle");
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA installed");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  const startSession = async () => {
    setStatus("Starting session...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setStatus("Session active: Detecting mood...");

      setTimeout(() => {
        setStatus("Mood: Calm | Tip: Breathe deeply and relax.");
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 4000);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setStatus("Error: Please allow camera and mic access.");
    }
  };

  const endSession = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStatus("Session ended.");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#111714] text-white px-6"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <h1 className="text-3xl font-bold mb-4 text-center">Mindful AI Wellness Assistant</h1>
      <p className="text-center max-w-lg text-gray-300 mb-6">
        This assistant uses webcam and microphone access to gently guide you toward emotional recalibration.
      </p>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-64 h-48 rounded-xl border border-gray-600 shadow mb-4"
      />

      <audio ref={audioRef} src="/audiopresion.mp3" preload="auto" />

      <div className="bg-[#222] text-[#38e07b] px-6 py-2 rounded mb-4">
        {status}
      </div>

      <div className="flex gap-4">
        <button
          onClick={startSession}
          className="py-2 px-4 bg-[#38e07b] text-[#111714] rounded-full font-semibold hover:opacity-90 transition"
        >
          Start Session
        </button>
        <button
          onClick={endSession}
          className="py-2 px-4 bg-[#ff5c5c] text-white rounded-full font-semibold hover:opacity-90 transition"
        >
          End & Exit
        </button>
      </div>

      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
        >
          Install Mindful App
        </button>
      )}
    </div>
  );
};

export default MainApp;
