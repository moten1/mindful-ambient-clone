import React from "react";

const HomePage = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#121714] overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#2b362f] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="w-4 h-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.08 24L4 19.25 9.96 8.75 18.04 13.5 18.04 4h11.92v9.5L38.04 8.75 44 19.25 35.92 24 44 28.75 38.04 39.25 29.96 34.5 29.96 44H18.04v-9.5L9.96 39.25 4 28.75 12.08 24Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold tracking-tight">Wellness AI</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            {/* Settings Button */}
            <button className="flex items-center justify-center h-10 rounded-full px-2.5 bg-[#2b362f] text-white text-sm font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,80a48,48,0,1,0,48,48A48,48,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84..." />
              </svg>
            </button>
            {/* Profile Picture */}
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8d03cDcIHiUAScXjoQZGcRcJNoGWno0fH9g-WpWGsM6XhtoYelgpzQ0z_0z4ECD8Y-PKrZjvHd6kO-k7rgkOmICQPq3sOVEfnWhmtqMFGcU-wMfTCtsY4YP8vlTvh7Zf-ZxEisNDopgRV9DynNhE66Jn9hgniL0Wz6-8gQV8sYT7LdmFGxCITzrDQsQhHBlXkfaAoCEd-v1aMgfAUqwzkCzzc-GxmS4U7vrxj0cV_ZXcDtmewfcIkEzJlTFwDw9FxxXwlZMUXWMk')",
              }}
            ></div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] w-full">
            {/* Welcome */}
            <h2 className="text-white text-[28px] font-bold text-center pt-5 pb-3">
              Welcome back, Amelia
            </h2>
            <p className="text-white text-base text-center px-4 pb-3">
              Your personal AI wellness assistant is ready. Choose a session type to begin.
            </p>

            {/* Session Buttons */}
            <div className="flex justify-center">
              <div className="flex gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center w-full">
                <button className="h-10 grow rounded-full px-4 bg-[#2b362f] text-white text-sm font-bold">
                  Free Session
                </button>
                <button className="h-10 grow rounded-full px-4 bg-[#94e0b2] text-[#121714] text-sm font-bold">
                  Start Session
                </button>
              </div>
            </div>

            {/* Session Preview */}
            <h2 className="text-white text-[22px] font-bold tracking-tight px-4 pb-3 pt-5">
              Session Preview
            </h2>
            <div className="p-4">
              <div className="flex flex-col @xl:flex-row @xl:items-start rounded-xl">
                {/* Preview Image */}
                <div
                  className="aspect-video w-full bg-center bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYZ1keckSPQFMA8_EKTHeUMYZYZ1_UJDmgLWsuOHODrI65nv28mUif-hX3aoOldon3aX5_6Ps69SLQD6_y4SpcRGYvGPuIPSJ58K6-7rrXUO8mN9GLTIw3ZHq2FenvXa0G670MQaDZh60PAwUM7qvjvsdjZ8s14g98da8339soYNeSnnIrP9tfRRj8-Zoi4c8_-8bhff3YlPDWslYjCX0eQvE0OL1ZVz9Px_xNNDZD8zh_Xf9yYXEhoqgG-xG0KSuZSJzesPU7Vt4')",
                  }}
                ></div>

                {/* Premium Info */}
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
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFWls_OEqZIwgne7vd--3xE2mn5j6H7InfA6CUSr8Qii-xvCmXLNVUOKggcUrY5CAhzZ8gdVEBciJmcfCItjJB8jT-PG1oLND4XjcQWgV3tfhLnzHzwPvXl7w2K_AWXGUfpzuGf_Lho01qCk1BwLGVFAHodSNLA1po_TkCTBBicVroxPl1RgQHtoQWiyq2y4cIMUatJo8n54dVtsdVD4hqmLpkeHpZcB9ALc6da-9xDKAm39eeuWnePNzaQxRyVYO4viP9Thfog-0')",
                }}
              ></div>
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
                className="form-input flex w-full resize-none rounded-xl text-white bg-[#2b362f] placeholder:text-[#a2b4a9] p-4 text-base min-h-36 focus:outline-none border-none"
              ></textarea>
            </div>

            {/* Chat Controls */}
            <div className="flex justify-between px-4 py-3">
              <button className="h-10 rounded-full px-4 bg-[#2b362f] text-white text-sm font-bold">
                Speak
              </button>
              <button className="h-10 rounded-full px-4 bg-[#94e0b2] text-[#121714] text-sm font-bold">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
