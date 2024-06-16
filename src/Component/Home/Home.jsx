import React from "react";

function Home() {
  return (
    <div className="h-full grid items-center justify-center text-white  ">
      <div className="grid gap-2 -mb-20">
        <h1 className="text-6xl font-bold text-pink-400 ">Hello -</h1>
        <h2 className="text-5xl font-bold text-[#444746]">
          How can I help you today?
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-5 text-center text-blue-100 ">
        <div className="w-48 h-48 bg-[#1E1F20] rounded-md text-center p-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, error
          id inventore delectus dolores repellendus
        </div>
        <div className="w-48 h-48 bg-[#1E1F20] rounded-md text-center p-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, error
          id inventore delectus dolores repellendus
        </div>
        <div className="w-48 h-48 bg-[#1E1F20] rounded-md text-center p-3 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, error
          id inventore delectus dolores repellendus
        </div>

        {/* <div className="w-48 h-48 bg-gray-500 rounded-md">diunden</div> */}
      </div>
    </div>
  );
}

export default Home;
