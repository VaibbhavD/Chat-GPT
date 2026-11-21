
import React, { useEffect, useState } from "react";
import gemini from "../../images/gemini.png";

const Chatgpt_res = ({ user }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const data = user?.data || "";

    if (user?.type !== "ai") {
      setDisplayedText(data);
      return;
    }

    let index = 0;
    let timeoutId;
    let cancelled = false;

    setDisplayedText("");

    const typingEffect = () => {
      if (cancelled) return;

      if (index < data.length) {
        setDisplayedText(data.slice(0, index + 1));
        index++;

        timeoutId = setTimeout(typingEffect, 10);
      }
    };

    if (data) {
      typingEffect();
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [user?.data, user?.type]);

  const isAI = user?.type === "ai";

  return (
    <div className="flex items-start gap-2.5 pb-5 w-full">

      {/* Avatar */}
      <img
        src={gemini}
        alt="Gemini"
        width={30}
        height={30}
        className={`shrink-0 ${
          isAI && !displayedText ? "animate-spin-medium" : ""
        }`}
      />

      <div className="flex flex-col gap-1 w-full max-w-[600px] min-w-0">

        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-md font-semibold text-pink-400">
            {isAI ? "Gemini" : "You"}
          </span>

          <span className="text-xs text-gray-500">
            {user?.time}
          </span>
        </div>

        {/* Message */}
        <div className="rounded-e-xl rounded-es-xl p-4">
          <div className="text-sm font-normal text-white whitespace-pre-wrap break-words">

            {isAI && !displayedText ? (
              <div className="flex items-center gap-1.5 py-1">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="w-2 h-2 rounded-full bg-pink-400"
                    style={{
                      animation: "typingDots 1.4s infinite ease-in-out",
                      animationDelay: `${dot * 0.2}s`,
                    }}
                  />
                ))}

                <style>{`
                  @keyframes typingDots {
                    0%, 60%, 100% {
                      opacity: 0.3;
                      transform: translateY(0);
                    }
                    30% {
                      opacity: 1;
                      transform: translateY(-5px);
                    }
                  }
                `}</style>
              </div>
            ) : (
              displayedText
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatgpt_res;
