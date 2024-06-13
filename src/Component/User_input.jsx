import React, { useState, useEffect } from "react";

const UserInput = (props) => {
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
          setTimeout(typingEffect, 30); // Adjust typing speed here
        }
      };
      typingEffect();
    } else {
      setDisplayedText(props.user.data);
    }
  }, [props.user.data, props.user.type]);

  return (
    <>
      {props.user.type === "user" ? (
        <div className="flex items-start gap-2.5 pb-5">
          <img
            className="w-8 h-8 rounded-full"
            src="https://tse1.mm.bing.net/th?id=OIP.mP1RB8xuQaHAvUkonYY6HwHaHK&pid=Api&P=0&h=180"
            alt="User image"
          />
          <div className="flex flex-col gap-1 w-full max-w-[600px]">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                You
              </span>
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                {props.user.time}
              </span>
            </div>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {props.user.data}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2.5 pb-5">
          <img
            className="w-8 h-8 rounded-full"
            src="https://tse4.mm.bing.net/th?id=OIP.n6aTpKW4pOfH1J91PU5yhwAAAA&pid=Api&P=0&h=180"
            alt="Bot image"
          />
          <div className="flex flex-col gap-1 w-full max-w-[600px]">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                ChatGPT
              </span>
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                {props.user.time}
              </span>
            </div>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {displayedText}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInput;
