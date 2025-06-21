import React from "react";

const LandingPage = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111714] overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#111714] @[480px]:rounded-xl min-h-80"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVr7Y36oyV-M9z4npTvjIsSl5B_zPDoXHTxMsY2RvEtDp1tc-irwEt4lyzS_s36MFM1-Uk_niC8uCg-UyoMXnDcAQrDMcAnx-5tiXstXF3-EqmeTezmfT1c3wV2Tmhz2YJ8HVmiMS3oI6q-C9Lfi19UzEUw9YhWmqxr7Mzo7yQfHxDc0TEH5n9AAStuEKrOKbOxhiMs9dGElLGZ7S526R6kcWgt8vJhBugTQnHgtjTbBiGj9LOTHTf6luamPn09xrqI4m5pK2wUzM')",
                  }}
                ></div>
              </div>
            </div>

            <h2 className="text-white text-[28px] font-bold text-center pt-5 pb-3">
              Energy Recalibration
            </h2>
            <p className="text-white text-base font-normal text-center px-4 pb-3">
              Your AI-powered wellness assistant. Detects your mood using voice and webcam, providing personalized support.
            </p>

            <div className="flex justify-center">
              <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
                {["Apple", "SearchEngineCo", "LinkedOut", "SocialNet"].map((provider) => (
                  <button
                    key={provider}
                    className="flex h-10 w-full cursor-pointer items-center justify-center rounded-full bg-[#29382f] px-4 text-white text-sm font-bold"
                  >
                    <span className="truncate">Log In with {provider}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex px-4 py-3 justify-center">
              <button
                className="flex h-10 max-w-[480px] cursor-pointer items-center justify-center rounded-full px-4 bg-[#38e07b] text-[#111714] text-sm font-bold"
              >
                <span className="truncate">Log In with Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
