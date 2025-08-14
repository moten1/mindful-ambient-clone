import React from "react";

interface ReportPageProps {
  mood?: string;
  moodChange?: string;
  moodChangePositive?: boolean;
}

const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 256 256"
    aria-hidden="true"
  >
    <path d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31 61.66 205.66a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66A8 8 0 0 1 61.66 50.34L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
  </svg>
);

const LogoIcon: React.FC = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.08 24L4 19.25 9.96 8.75 18.04 13.5V4h11.92v9.5l8.08-4.75L44 19.25 35.92 24 44 28.75l-5.96 10.5-8.08-4.75V44H18.04v-9.5l-8.08 4.75L4 28.75 12.08 24Z"
      fill="currentColor"
    />
  </svg>
);

const ReportPage: React.FC<ReportPageProps> = ({
  mood = "Calm",
  moodChange = "+10%",
  moodChangePositive = true,
}) => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#121715] overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex flex-col h-full grow">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#2b3632] px-6 md:px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="w-4 h-4">
              <LogoIcon />
            </div>
            <h1 className="text-lg font-bold tracking-tight">Wellness AI</h1>
          </div>
          <button
            className="flex items-center justify-center h-10 px-2.5 rounded-xl bg-[#2b3632] text-white text-sm font-bold"
            aria-label="Close report"
          >
            <CloseIcon />
          </button>
        </header>

        {/* Report Content */}
        <main className="px-6 md:px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] w-full py-5">
            <h2 className="text-white text-[28px] font-bold text-center px-4 pb-3 pt-5">
              Session Report
            </h2>
            <p className="text-white text-base text-center px-4 pb-3">
              Here&apos;s a summary of your mood detected during the session.
            </p>

            {/* Mood Summary */}
            <section className="flex flex-wrap gap-4 p-4">
              <div className="flex flex-col gap-2 p-6 bg-[#2b3632] rounded-xl min-w-[158px] flex-1">
                <p className="text-white text-base font-medium">Overall Mood</p>
                <p className="text-white text-2xl font-bold">{mood}</p>
              </div>
            </section>

            {/* Mood Breakdown */}
            <section>
              <h3 className="text-white text-lg font-bold px-4 pb-2 pt-4">
                Mood Breakdown
              </h3>
              <div className="flex flex-wrap gap-4 px-4 py-6">
                <div className="flex flex-col gap-2 min-w-72 flex-1">
                  <p className="text-white text-base font-medium">
                    Mood Over Time
                  </p>
                  <p className="text-white text-[32px] font-bold truncate">
                    {mood}
                  </p>
                  <div className="flex gap-1 items-center">
                    <p className="text-[#a1b5ae] text-base">Last Session</p>
                    <p
                      className={`text-base font-medium ${
                        moodChangePositive ? "text-[#0bda49]" : "text-red-500"
                      }`}
                    >
                      {moodChange}
                    </p>
                  </div>
                  <div className="flex flex-col gap-8 py-4 min-h-[180px]">
                    {/* Graph */}
                    <svg
                      width="100%"
                      height="148"
                      viewBox="-3 0 478 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 109C18.15 109 18.15 21 36.3 21C54.46 21 54.46 41 72.62 41C90.77 41 90.77 93 108.92 93C127.08 93 127.08 33 145.23 33C163.39 33 163.39 101 181.54 101C199.69 101 199.69 61 217.85 61C236 61 236 45 254.15 45C272.31 45 272.31 121 290.46 121C308.62 121 308.62 149 326.77 149C344.92 149 344.92 1 363.08 1C381.23 1 381.23 81 399.39 81C417.54 81 417.54 129 435.69 129C453.85 129 453.85 25 472 25V149H0V109Z"
                        fill="url(#gradientFill)"
                      />
                      <path
                        d="M0 109C18.15 109 18.15 21 36.3 21C54.46 21 54.46 41 72.62 41C90.77 41 90.77 93 108.92 93C127.08 93 127.08 33 145.23 33C163.39 33 163.39 101 181.54 101C199.69 101 199.69 61 217.85 61C236 61 236 45 254.15 45C272.31 45 272.31 121 290.46 121C308.62 121 308.62 149 326.77 149C344.92 149 344.92 1 363.08 1C381.23 1 381.23 81 399.39 81C417.54 81 417.54 129 435.69 129C453.85 129 453.85 25 472 25"
                        stroke="#a1b5ae"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="gradientFill"
                          x1="236"
                          y1="1"
                          x2="236"
                          y2="149"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#2b3632" />
                          <stop
                            offset="1"
                            stopColor="#2b3632"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="flex justify-around text-[#a1b5ae] text-[13px] font-bold tracking-wide">
                      <p>0min</p>
                      <p>5min</p>
                      <p>10min</p>
                      <p>15min</p>
                      <p>20min</p>
                      <p>25min</p>
                      <p>30min</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Close Button */}
            <div className="flex px-4 py-3">
              <button className="flex-1 h-10 rounded-xl bg-[#28a37a] text-white text-sm font-bold">
                Close
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportPage;
