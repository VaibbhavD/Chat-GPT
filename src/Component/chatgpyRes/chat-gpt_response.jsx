
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader.jsx";
import gemini from "../../images/gemini.png";

const Chatgpt_res = ({ user }) => {
  const [displayedText, setDisplayedText] = useState("");

  const isAI = user?.type === "ai";
  const isLoading = isAI && user?.loading;
  const isError = isAI && user?.error;

  useEffect(() => {
    const data = user?.data || "";

    if (!isAI || isLoading) {
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
  }, [user?.data, user?.type, isLoading]);

  return (
    <div className="flex items-start gap-2.5 pb-5 w-full">

      {/* Avatar */}
      <img
        src={gemini}
        alt="Gemini"
        width={30}
        height={30}
        className={`shrink-0 ${
          isAI && (isLoading || !displayedText)
            ? "animate-spin-medium"
            : ""
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

            {isLoading ? (
              <Loader />
            ) : isError ? (
              <span className="text-red-400">
                {user.error}
              </span>
            ) : (
              displayedText || (isAI ? <Loader /> : "")
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatgpt_res;
