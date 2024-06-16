import React, { useContext, useEffect, useState } from "react";
import Loader from "./loader/Loader";
import Context from "../ContextStore/Store";
import gemini from "../images/gemini.png";

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
        <img
          src={gemini}
          width={30}
          className={`${!displayedText && "animate-spin-medium"}`}
        />

        <div className="flex flex-col gap-1 w-full max-w-[600px]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-md font-semibold  text-pink-400">Gemini</span>
            <span className="text-xs font-normal text-gray-500 ">
              {props.user.time}
            </span>
          </div>
          <div className="flex flex-col leading-1.5 p-4 border-gray-200  rounded-e-xl rounded-es-xl ">
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
