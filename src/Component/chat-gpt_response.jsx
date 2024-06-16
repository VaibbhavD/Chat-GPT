import React, { useContext, useEffect, useState } from "react";
import Loader from "./loader/Loader";
import Context from "../ContextStore/Store";

const Chatgpt_res = (props) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (props.user.type === "ai") {
      let i = 0;
      let text = "";

      setDisplayedText(""); // Reset displayedText when a new bot message is received
      const typingEffect = () => {
        if (i < props.user.data.length) {
          text += props.user.data.charAt(i);
          setDisplayedText(text);
          i++;
          setTimeout(typingEffect, 10); // Adjust typing speed here
        }
      };
      typingEffect();
    } else {
      setDisplayedText(props.user.data);
    }
  }, [props.user.data, props.user.type]);

  return (
    <>
      <div className="flex items-start gap-2.5 pb-5">
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width={30}
          className={`${!displayedText && "animate-spin-medium"}`}
        >
          <path
            d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
            fill="url(#prefix__paint0_radial_980_20147)"
          />
          <defs>
            <radialGradient
              id="prefix__paint0_radial_980_20147"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
            >
              <stop offset=".067" stop-color="#9168C0" />
              <stop offset=".343" stop-color="#5684D1" />
              <stop offset=".672" stop-color="#1BA1E3" />
            </radialGradient>
          </defs>
        </svg>

        <div className="flex flex-col gap-1 w-full max-w-[600px]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-md font-semibold  text-pink-400">Gemini</span>
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
              {props.user.time}
            </span>
          </div>
          <div className="flex flex-col leading-1.5 p-4 border-gray-200  rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p className="text-sm font-normal text-white">
              {displayedText && displayedText}
              {!displayedText && <Loader />}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chatgpt_res;
