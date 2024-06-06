import React from "react";

const Chatgpt_res = (props) => {
  return (
    <div class="flex items-start gap-2.5 pb-5">
      <img
        class="w-8 h-8 rounded-full"
        src="https://tse4.mm.bing.net/th?id=OIP.n6aTpKW4pOfH1J91PU5yhwAAAA&pid=Api&P=0&h=180"
        alt="Jese image"
      />
      <div class="flex flex-col gap-1 w-full max-w-[600px]">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span class="text-xs font-normal text-gray-500 dark:text-gray-400">
            {props.ai.time}
          </span>
        </div>
        <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p class="text-sm font-normal text-gray-900 dark:text-white">
            {" "}
            {props.ai.data}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Chatgpt_res;
