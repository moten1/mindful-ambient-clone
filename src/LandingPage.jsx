import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.15; // low start
      audio
        .play()
        .catch(() => {
          console.warn("Autoplay blocked — waiting for user interaction.");
        });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleEnter = () => {
    if (audioRef.current) {
      const fadeOut = setInterval(() => {
        if (audioRef.current.volume > 0.01) {
          audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.01);
        } else {
          audioRef.current.pause();
          clearInterval(fadeOut);
        }
      }, 60);
    }
    navigate("/app");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#111714] text-white px-6"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      {/* Background Audio */}
      <audio ref={audioRef} src="/audiopresession.mp3" loop preload="auto" />

      {/* Logo */}
      <img
        src="/Logo.png"
        alt="Mindful Logo"
        className="mb-8"
        style={{ height: "80px" }}
      />

      {/* Hero Image */}
      <div
        className="w-full max-w-4xl h-64 bg-cover bg-center rounded-xl shadow-lg"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVr7Y36oyV-M9z4npTvjIsSl5B_zPDoXHTxMsY2RvEtDp1tc-irwEt4lyzS_s36MFM1-Uk_niC8uCg-UyoMXnDcAQrDMcAnx-5tiXstXF3-EqmeTezmfT1c3wV2Tmhz2YJ8HVmiMS3oI6q-C9Lfi19UzEUw9YhWmqxr7Mzo7yQfHxDc0TEH5n9AAStuEKrOKbOxhiMs9dGElLGZ7S526R6kcWgt8vJhBugTQnHgtjTbBiGj9LOTHTf6luamPn09xrqI4m5pK2wUzM')",
        }}
      />

      {/* Text */}
      <h1 className="text-3xl font-bold mt-10 mb-4 text-center">
        Energy Recalibration
      </h1>
      <p className="text-center max-w-xl text-gray-300">
        Your AI-powered wellness assistant detects your mood using voice and webcam,
        offering personalized guidance for emotional balance and restoration.
      </p>

      {/* Button */}
      <button
        onClick={handleEnter}
        className="mt-8 py-3 px-6 rounded-full bg-[#38e07b] text-[#111714] font-semibold hover:opacity-90 transition"
      >
        Enter Session
      </button>
    </div>
  );
};

export default LandingPage;
