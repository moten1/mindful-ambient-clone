// src/App.jsx
import { useEffect, useState } from "react";
import * as faceapi from "@vladmandic/face-api";

function MainApp() {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [loggedIn, setLoggedIn] = useState(!!userName);
  const [code, setCode] = useState("");
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [freeUsed, setFreeUsed] = useState(localStorage.getItem("freeUsed") === "yes");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(null);
  const [bgColor, setBgColor] = useState("#0A1A14");
  const [moodHistory, setMoodHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    if (premiumUnlocked) {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models")
      ]).then(startVideo);
    }
  }, [premiumUnlocked]);

  const startVideo = () => {
    const video = document.getElementById("video");
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch(() => {
        setMood("neutral");
        setBgColor("#1A1A1A");
      });

    video?.addEventListener("play", () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      const displaySize = { width: 300, height: 225 };
      faceapi.matchDimensions(canvas, displaySize);
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        const resized = faceapi.resizeResults(detections, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceExpressions(canvas, resized);
        const emotions = resized[0]?.expressions;
        if (emotions) {
          const topEmotion = Object.entries(emotions).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
          setMood(topEmotion);
          setBgColor(topEmotion === "happy" ? "#103C2D" : "#2E2E2E");
          setMoodHistory((prev) => [...prev, { emotion: topEmotion, time: Date.now() }]);
        }
      }, 2000);
    });
  };

  const summarizeMood = () => {
    const count = {};
    for (const entry of moodHistory) {
      count[entry.emotion] = (count[entry.emotion] || 0) + 1;
    }
    const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
    const summary = sorted.map(([m, c]) => `${m}: ${c}`).join("\n");
    const top = sorted[0]?.[0] || "neutral";
    alert(`🧠 Mood Summary:\n\nMost frequent: ${top}\n\nDetails:\n${summary}`);
  };

  const handleLogin = (name) => {
    localStorage.setItem("userName", name);
    setUserName(name);
    setLoggedIn(true);
  };

  const verifyCode = () => {
    if (code.trim() === "963") {
      setPremiumUnlocked(true);
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  let recognition = null;

  const startVoiceConversation = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice recognition not supported");

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      await handleSend(transcript);
      if (isListening) recognition.start(); // continue loop
    };

    recognition.onerror = (e) => {
      console.error("Speech error:", e.error);
      if (isListening) recognition.start(); // retry on error
    };

    setIsListening(true);
    recognition.start();
  };

  const stopVoiceConversation = () => {
    setIsListening(false);
    recognition?.stop();
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (customInput) => {
  const msg = customInput || message;
  if (!msg.trim()) return;
  setLoading(true);
  setResponse("");

  // ✅ Check if API key is loaded
  console.log("Loaded API key:", apiKey);

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
          {
            role: "system",
            content:
              "You are a calm, emotionally intelligent assistant who gives thoughtful, supportive, and helpful replies. Use empathetic language and avoid short answers."
          },
          { role: "user", content: msg }
        ]
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ OpenAI API error response:", errText);
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "I'm here with you.";
    setResponse(reply);
    speak(reply);
  } catch (err) {
    console.error("OpenAI fetch error:", err);
    setResponse("Sorry, I couldn’t reach the AI.");
  } finally {
    setLoading(false);
  }
};


  const handleFreeMeditation = () => {
    localStorage.setItem("freeUsed", "yes");
    setFreeUsed(true);
    document.getElementById("meditation").style.display = "block";
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Welcome to Mindful AI</h2>
        <button onClick={() => handleLogin("guest@email.com")}>Continue with Email</button>
      </div>
    );
  }

  if (!premiumUnlocked) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Welcome, {userName}</h2>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
        <button onClick={verifyCode}>Unlock</button>

        <h3 style={{ marginTop: "2rem" }}>Free Meditation</h3>
        {freeUsed ? (
          <p>✅ Session used today</p>
        ) : (
          <button onClick={handleFreeMeditation}>▶️ Start Free Meditation</button>
        )}

        <div id="meditation" style={{ display: "none", marginTop: "1rem" }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/7EJKDj6ELiM?autoplay=1&controls=0&modestbranding=1&rel=0"
            title="Meditation"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
            style={{ borderRadius: "12px" }}
          ></iframe>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 600, margin: "auto", backgroundColor: bgColor, color: "white", borderRadius: "10px" }}>
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

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button
          onClick={() => handleSend()}
          disabled={loading}
          style={{ padding: "0.75rem 1.5rem", backgroundColor: "#2E9E83", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer" }}
        >
          {loading ? "Thinking..." : "Send to AI"}
        </button>

        <button
          onClick={isListening ? stopVoiceConversation : startVoiceConversation}
          style={{ padding: "0.75rem 1.5rem", backgroundColor: "#555", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer" }}
        >
          {isListening ? "⏹️ Stop Chat" : "🎙️ Start Chat"}
        </button>

        <button
          onClick={summarizeMood}
          style={{ padding: "0.75rem 1.5rem", backgroundColor: "#888", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer" }}
        >
          📊 Mood Report
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

export default MainApp;

