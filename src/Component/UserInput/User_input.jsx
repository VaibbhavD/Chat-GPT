
import React from "react";
import Chatgpt_res from "../chatgpyRes/chat-gpt_response.jsx";

const UserInput = ({ user }) => {
  if (user?.type === "ai") {
    return <Chatgpt_res user={user} />;
  }

  return (
    <div className="flex items-start gap-2.5 pb-5 w-full">
      <img
        className="w-8 h-8 rounded-full shrink-0"
        src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png"
        alt="User"
      />

      <div className="flex flex-col gap-1 w-full max-w-[600px] min-w-0 text-white">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            You
          </span>

          <span className="text-xs text-gray-500">
            {user?.time}
          </span>
        </div>

        <div className="p-4 bg-[#1E1F20] rounded-e-xl rounded-es-xl">
          <p className="text-sm whitespace-pre-wrap break-words">
            {user?.data}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInput;
