import UserInput from "./User_input";
import Chatgpt_res from "./chat-gpt_response";
import { useState } from "react";
import "../App.css";

const Main = () => {
  const [Userinput, setUserInput] = useState("");

  const SubmitHandle = () => {
    <UserInput userin={UserInput} />;
  };

  return (
    <body class="flex flex-col items-center justify-center p-5 max-h-screen h-screen text-gray-800 lg:ml-80">
      <div class="flex flex-col flex-grow w-full max-w-2xl min-h- overflow-auto scrollbar-hide rounded-lg ">
        {/* <UserInput user={UserInput} /> */}
      </div>
      <div class=" p-4 w-full max-w-2xl flex">
        <input
          class="flex items-center h-10 w-full min-w-2xl rounded-xl p-6 text-sm border-2"
          type="text"
          placeholder="Type your message…"
          name="userin"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="button" onClick={SubmitHandle}>
          ^|
        </button>
      </div>
    </body>
  );
};
export default Main;
