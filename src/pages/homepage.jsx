import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ username = "Amelia" }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#121714] overflow-x-hidden font-[Manrope,_'Noto_Sans',sans-serif]">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#2b362f] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="w-4 h-4" aria-label="App Logo">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.08 24L4 19.25 9.96 8.75 18.04 13.5V4h11.92v9.5L38.04 8.75 44 19.25 35.92 24 44 28.75 38.04 39.25 29.96 34.5V44H18.04v-9.5L9.96 39.25 4 28.75 12.08 24Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold tracking-tight">Wellness AI</h2>
          </div>

          {/* Settings + Profile */}
          <div className="flex flex-1 justify-end gap-8">
            <button
              className="flex items-center justify-center h-10 rounded-full px-2.5 bg-[#2b362f] text-white text-sm font-bold"
              aria-label="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,80a48,48,0,1,0,48,48A48,48,0,0,0,128,80Z" />
              </svg>
            </button>
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              role="img"
              aria-label="User profile picture"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/...')",
              }}
            />
          </div>
        </header>

        {/* Main Content */}
        <div className="px-6 md:px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] w-full">
            {/* Welcome */}
            <h2 className="text-white text-[28px] font-bold text-center pt-5 pb-3">
              Welcome back, {username}
            </h2>
            <p className="text-white text-base text-center px-4 pb-3">
              Your personal AI wellness assistant is ready. Choose a session type to begin.
            </p>

            {/* Session Buttons */}
            <div className="flex justify-center">
              <div className="flex gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center w-full">
                <Link
                  to="/free-meditation"
                  className="h-10 grow rounded-full px-4 bg-[#2b362f] text-white text-sm font-bold flex items-center justify-center"
                >
                  Free Session
                </Link>
                <Link
                  to="/start-session"
                  className="h-10 grow rounded-full px-4 bg-[#94e0b2] text-[#121714] text-sm font-bold flex items-center justify-center"
                >
                  Start Session
                </Link>
              </div>
            </div>

            {/* Session Preview */}
            <h2 className="text-white text-[22px] font-bold tracking-tight px-4 pb-3 pt-5">
              Session Preview
            </h2>
            <div className="p-4 rounded-xl bg-[#1a1f1c]">
              <div className="flex flex-col @xl:flex-row @xl:items-start gap-4">
                <div
                  className="aspect-video w-full bg-center bg-cover rounded-xl"
                  role="img"
                  aria-label="Meditation preview"
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/...')",
                  }}
                />
                <div className="flex flex-col gap-1 py-4 px-4">
                  <p className="text-white text-lg font-bold tracking-tight">Mood Indicator: Locked</p>
                  <div className="flex items-end justify-between gap-3">
                    <p className="text-[#a2b4a9] text-base">
                      Premium features are locked. Activate with a valid code to unlock full access.
                    </p>
                    <button className="h-8 rounded-full px-4 bg-[#94e0b2] text-[#121714] text-sm font-medium">
                      Activate Premium
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <h2 className="text-white text-[22px] font-bold tracking-tight px-4 pb-3 pt-5">Chat</h2>
            <div className="flex items-end gap-3 p-4">
              <div
                className="w-10 h-10 bg-center bg-cover rounded-full shrink-0"
                role="img"
                aria-label="AI Assistant Avatar"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/...')",
                }}
              />
              <div className="flex flex-col gap-1">
                <p className="text-[#a2b4a9] text-[13px]">AI Assistant</p>
                <p className="text-base text-white bg-[#2b362f] rounded-xl px-4 py-3 max-w-[360px]">
                  Hello, I'm ready to assist you. How are you feeling today?
                </p>
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <textarea
                placeholder="Type your message..."
                className="form-input flex w-full resize-none rounded-xl text-white bg-[#2b362f] placeholder:text-[#a2b4a9] p-4 text-base min-h-36 focus:out
