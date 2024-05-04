import React, { useContext, useState } from "react";
import UserInput from "./User_input";
import Chatgpt_res from "./chat-gpt_response";
import UpArrow from "../images/up-arrow.png";
import Context from "../ContextStore/Store";
import "../App.css";

const Main = () => {
  const [userInput, setUserInput] = useState("");
  const context = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the user input, like sending it to a chatbot
    const data = {
      type: "user",
      data: userInput,
      time: new Date().toLocaleTimeString(),
    };
    context.AddMesages(data);
    // Clear input field after submission if needed
    setUserInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 max-h-screen h-screen text-gray-800 lg:ml-80">
      <div className="flex flex-col flex-grow w-full max-w-2xl min-h-0 overflow-auto scrollbar-hide rounded-lg">
        {context.Messages ? (
          context.Messages.map((mess) => <Chatgpt_res user={mess} />)
        ) : (
          <h1>Vaibhav</h1>
        )}

        {/* Render chat responses here if applicable */}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex rounded-xl border-2 p-2"
      >
        <input
          className="flex items-center h-4 w-full min-w-2xl rounded-xl p-4 text-sm outline-none font-bolder"
          type="text"
          placeholder="Type your message…"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
        />
        <button type="submit" className="text-black">
          <img src={UpArrow} className="w-5 m-2" alt="Send" />
        </button>
      </form>
    </div>
  );
};

export default Main;
