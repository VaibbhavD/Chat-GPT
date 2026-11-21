
import React, { useContext, useEffect, useRef, useState } from "react";
import UserInput from "../UserInput/User_input.jsx";
import UpArrow from "../../images/up-arrow.png";
import Context from "../../ContextStore/Store";
import "../../App.css";
import Home from "../Home/Home";

// IMPORTANT: Adjust this path to the location of your Gemini API file.
import { run } from "../../config/gemini";

const Main = () => {
  const [userInput, setUserInput] = useState("");
  const context = useContext(Context);
  const contentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = userInput.trim();

    if (!message || context.loader) return;

    // Start loading
    context.Setloader(true);

    // Add user message
    context.AddMesages({
      type: "user",
      data: message,
      time: new Date().toLocaleTimeString(),
    });

    // Add empty AI message immediately (shows three dots)
    context.AddMesages({
      type: "ai",
      data: "",
      loading: true,
      error: false,
      time: new Date().toLocaleTimeString(),
    });

    setUserInput("");

    try {
      // Call Gemini API
      const response = await run(message);

      // Update existing AI message
      context.UpdateLastMessage({
        data: response,
        loading: false,
        error: false,
      });

    } catch (error) {
      console.error("Gemini API Error:", error);

      // Display error in existing AI message
      context.UpdateLastMessage({
        data: error.message || "Something went wrong. Please try again.",
        loading: false,
        error: true,
      });

    } finally {
      // Stop loading
      context.Setloader(false);
    }
  };

  // Auto scroll
  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop =
        contentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [context.Messages, context.loader]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-800 lg:ml-72 lg:pl-10 pb-4 bg-black">

      {/* Navbar */}
      <nav className="w-full h-4 py-7 flex justify-between items-center font-semibold text-lg text-white">
        <select className="border-none font-bolder text-md p-2 rounded-md bg-transparent">
          <option className="bg-black">GeminiAi 4.0</option>
          <option className="bg-black">Gemini</option>
        </select>
      </nav>

      {/* Chat messages */}
      <div
        className="flex flex-col flex-grow w-full max-w-2xl overflow-auto scrollbar-hide rounded-lg p-4 md:pt-4 pt-0"
        ref={contentRef}
      >
        {context.Messages.length > 0 ? (
          context.Messages.map((mess, index) => (
            <UserInput
              key={index}
              user={mess}
            />
          ))
        ) : (
          <Home />
        )}
      </div>

      {/* Message input */}
      <div className="w-full px-2">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl flex m-auto justify-center rounded-xl border-2 p-2 bg-[#1E1F20]"
        >
          <input
            className="flex items-center text-white h-4 w-full min-w-0 rounded-xl p-4 text-md outline-none font-bolder bg-[#1E1F20]"
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={context.loader}
            required
          />

          <button
            type="submit"
            className="bg-white rounded-full p-1 disabled:opacity-50"
            disabled={context.loader || !userInput.trim()}
          >
            <img
              src={UpArrow}
              className="w-5 bg-white"
              alt="Send"
            />
          </button>
        </form>

        <h1 className="text-white pt-1 text-center">
          Made By{" "}
          <a
            href="https://my-portfolio-puxr.vercel.app/"
            className="text-pink-500"
          >
            Vaibhav D
          </a>
        </h1>
      </div>
    </div>
  );
};

export default Main;
