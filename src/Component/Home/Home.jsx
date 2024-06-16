import React, { useContext } from "react";
import gemini from "../../images/gemini.png";

function Home() {
  return (
    <div className="h-full grid items-center justify-center text-white md:py-0 py-14 gap-10 ">
      <div className="grid gap-2 ">
        <h1 className="text-6xl font-bold text-pink-400 ">Hello -</h1>
        <h2 className="text-3xl md:text-5xl font-bold text-[#444746]">
          How can I help you today?
        </h2>
      </div>
      <div className=" grid md:grid-cols-3 gap-5 text-center text-blue-200 md:mb-14">
        <div className=" bg-[#1E1F20] rounded-m p-1 md:p-3">
          <h1 className="text-xl text-blue-600 font-bold">Google</h1>
          Gemini is the best way to directly access Google’s best family of AI
          models.{" "}
        </div>
        <div className=" bg-[#1E1F20] rounded-m p-1 md:p-3">
          <h1 className="text-xl text-pink-400 font-bold">
            <span className="text-blue-400">Gemini</span> AI
          </h1>
          Chat to supercharge your ideas, write, learn, plan and more.
        </div>
        <div className=" bg-[#1E1F20] rounded-m p-1">
          <h1 className="text-xl text-blue-400 font-bold">
            Gen<span className="text-pink-400">AI</span>
          </h1>
          Get help with writing, planning, learning, and more from Google GEN
          AI.
        </div>

        {/* <div className="w-48 h-48 bg-gray-500 rounded-md">diunden</div> */}
      </div>
    </div>
  );
}

export default Home;
