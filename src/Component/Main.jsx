import React, { useContext, useState } from "react";
import UserInput from "./User_input";
import Chatgpt_res from "./chat-gpt_response";
import UpArrow from "../images/up-arrow.png";
import Context from "../ContextStore/Store";
import "../App.css";
import Home from "./Home/Home";

const Main = () => {
  const [userInput, setUserInput] = useState("");
  const context = useContext(Context);

  const handleSubmit = async (e) => {
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

  return (
    <div className="flex flex-col items-center justify-center max-h-screen h-screen text-gray-800 lg:ml-72 lg:pl-10 pb-5 bg-black">
      <nav className="w-full h-4 py-7 flex justify-between items-center font-semibold text-lg text-white ">
        <select className="border-none font-bolder text-md p-2 rounded-md bg-transparent ">
          <option>Gemini</option>
          <option>GeminiAi 4.0</option>
        </select>
      </nav>
      <div className="flex flex-col flex-grow w-full max-w-2xl min-h-0 overflow-auto scrollbar-hide rounded-lg p-4">
        {context.Messages.length > 0 ? (
          context.Messages.map((mess) => <UserInput user={mess} />)
        ) : (
          <Home />
        )}

        {/* Render chat responses here if applicable */}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex rounded-xl border-2 p-2 bg-[#1E1F20]"
      >
        <input
          className="flex items-center text-white h-4 w-full min-w-2xl rounded-xl p-4 text-md outline-none font-bolder bg-[#1E1F20]"
          type="text"
          placeholder="Type your message…"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
        />
        <button type="submit" className="bg-white rounded-full">
          <img src={UpArrow} className="w-5 m-2 bg-white" alt="Send" />
        </button>
      </form>
    </div>
  );
};

export default Main;
