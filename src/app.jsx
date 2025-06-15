// src/App.jsx
import { useState, useEffect } from "react";
import * as faceapi from "@vladmandic/face-api";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(null);
  const [bgColor, setBgColor] = useState("#0A1A14");
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(
      "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/"
    ),
    faceapi.nets.faceExpressionNet.loadFromUri(
      "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/"
    )
  ]).then(startVideo);
}, []);



  const startVideo = () => {
    const video = document.getElementById("video");
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
    });

    video.addEventListener("play", () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      const displaySize = { width: 300, height: 225 };
      faceapi.matchDimensions(canvas, displaySize);
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        const resized = faceapi.resizeResults(detections, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceExpressions(canvas, resized);
        const emotions = resized[0]?.expressions;
        if (emotions) {
          const topEmotion = Object.entries(emotions).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
          setMood(topEmotion);
          setBgColor(topEmotion === "happy" ? "#103C2D" : "#2E2E2E");
        }
      }, 2000);
    });
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a calming emotional assistant." },
            { role: "user", content: message }
          ]
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "I'm here with you.";
      setResponse(reply);
      speak(reply);
    } catch (err) {
      console.error("OpenAI error:", err);
      setResponse("Sorry, I couldn’t reach the AI.");
    } finally {
      setLoading(false);
    }
  };

  const startVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      handleSend();
    };
    recognition.start();
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: 600,
        margin: "auto",
        backgroundColor: bgColor,
        color: "white",
        borderRadius: "10px"
      }}
    >
      <h1>🧘 Mindful Voice + Mood AI</h1>

      <video id="video" width="300" height="225" autoPlay muted style={{ borderRadius: "8px" }} />
      <div style={{ margin: "0.5rem 0", fontSize: "0.9rem" }}>
        Mood detected: <strong>{mood || "Detecting..."}</strong>
      </div>

      <textarea
        rows="4"
        placeholder="Speak or type what's on your mind..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", padding: "1rem", fontSize: "1rem", marginBottom: "1rem" }}
      />

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#2E9E83",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          {loading ? "Thinking..." : "Send to AI"}
        </button>

        <button
          onClick={startVoiceInput}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#555",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          🎙️ Speak
        </button>
      </div>

      {response && (
        <div style={{ marginTop: "2rem", background: "#1A3B34", padding: "1rem", borderRadius: "8px" }}>
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default App;
