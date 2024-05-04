import React from "react";

const UserInput = (props) => {
  return (
    <div class="flex w-full mt-2 space-x-3 max-w-xl m-4 font-semibold mb-4">
      <div class="flex-shrink-0 h-10 w-10 rounded-full flex justify-center items-center">
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH&pid=Api&P=0&h=180"
          className="w-7"
        />
      </div>
      <div>
        <span class="font-bold ">You</span>
        <div class=" rounded-r-lg rounded-bl-lg">
          <p class="text-sm pl-4 ">{props.user.data}</p>
        </div>
        <span class="text-[12px] text-gray-500 leading-none">
          {props.user.time}
        </span>
      </div>
    </div>
  );
};
export default UserInput;
