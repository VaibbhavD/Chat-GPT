import React, { useContext, useEffect, useRef, useState } from "react";
import UserInput from "./User_input";
import Chatgpt_res from "./chat-gpt_response";
import UpArrow from "../images/up-arrow.png";
import Context from "../ContextStore/Store";
import "../App.css";
import Home from "./Home/Home";

const Main = () => {
  const [userInput, setUserInput] = useState("");
  const context = useContext(Context);
  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    context.Setloader(true);
    e.preventDefault();
    // Do something with the user input, like sending it to a chatbot
    const data = {
      type: "user",
      data: userInput,
      time: new Date().toLocaleTimeString(),
    };
    context.AddMesages(data);
    setUserInput("");
    // context.Setloader();
    // console.log(context.loader);
  };
  const scrollToBottom = () => {
    if (context.Messages.length > 0) {
      const contentDiv = contentRef.current;
      contentDiv.scrollTop = contentDiv.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [context.Messages, context.loader]);

  return (
    <div className="flex flex-col items-center justify-center md:h-screen text-gray-800 lg:ml-72 lg:pl-10 pb-3 bg-black">
      <nav className="w-full h-4 py-7 flex justify-between items-center font-semibold text-lg text-white ">
        <select className="border-none font-bolder text-md p-2 rounded-md bg-transparent ">
          <option className="bg-black">GeminiAi 4.0</option>
          <option className="bg-black">Gemini</option>
        </select>
      </nav>
      <div
        className="flex flex-col flex-grow w-full max-w-2xl overflow-auto scrollbar-hide rounded-lg p-4 md:pt-4 pt-0"
        ref={contentRef}
      >
        {context.Messages.length > 0 ? (
          context.Messages.map((mess) => <UserInput user={mess} />)
        ) : (
          <Home />
        )}

        {/* Render chat responses here if applicable */}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex rounded-xl border-2 p-2  bg-[#1E1F20]"
      >
        <input
          className="flex items-center text-white h-4 w-full min-w-2xl rounded-xl p-4 text-md outline-none font-bolder bg-[#1E1F20]"
          type="text"
          placeholder="Type your message…"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-white rounded-full p-2"
          // disabled={context.loader === true ? true : false}
        >
          <img src={UpArrow} className="w-5  bg-white" alt="Send" />
        </button>
      </form>
      <h1 className="text-white pt-1">
        Made By{" "}
        <a
          href="https://my-portfolio-puxr.vercel.app/"
          className="text-pink-500 "
        >
          Vaibhav D
        </a>
      </h1>
    </div>
  );
};

export default Main;
