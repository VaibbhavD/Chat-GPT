import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState(true);
  function openSidebar() {
    // document.querySelector(".sidebar").classList.toggle("hidden");
    setActive((prev) => !prev);
  }
  return (
    <>
      <body class="bg-blue-700 hidden lg:block">
        <span
          class="absolute text-white text-4xl top-5 left-4 cursor-pointer"
          onClick={openSidebar}
        >
          <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
        </span>
        <div
          class={
            active
              ? "sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-[#1E1F20]"
              : "hidden"
          }
        >
          <div class="text-gray-100 text-xl">
            <div class="p-2.5 mt-1 flex items-center">
              {/* <i class=" px-2 py-1 rounded-md bg-blue-600"> */}
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.n6aTpKW4pOfH1J91PU5yhwAAAA&pid=Api&P=0&h=180"
                alt="image"
                className="w-10 bg-gray-900"
              />
              {/* </i> */}
              <h1 class="font-bold text-blue-300 text-[15px] ml-3">
                Gemini <span className="text-pink-500">AI</span>
              </h1>
              <i
                class="bi bi-x cursor-pointer ml-28 lg:hidden "
                onClick={openSidebar}
              ></i>
            </div>
            <div class="my-2 bg-gray-600 h-[1px]"></div>
          </div>

          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i class="bi bi-house-door-fill"></i>
            <span class="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
          </div>
          <div class="p-2.5 mt-3 flex items-center justify-between rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <span class="text-[15px] ml-4 text-gray-200 font-bold">
              New Chat
            </span>
            <i className="text-2xl font-bold text-center">+</i>
          </div>
          {/* <div class="my-4 bg-gray-600 h-[1px]"></div>
          <div
            class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onclick="dropdown()"
          >
            <i class="bi bi-chat-left-text-fill"></i>
            <div class="flex justify-between w-full items-center">
              <span class="text-[15px] ml-4 text-gray-200 font-bold">
                Chatbox
              </span>
              <span class="text-sm rotate-180" id="arrow">
                <i class="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div
            class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
            id="submenu"
          >
            <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Social
            </h1>
            <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Personal
            </h1>
            <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Friends
            </h1>
          </div> */}
          {/* <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ">
            <i class="bi bi-box-arrow-in-right"></i>
            <span class="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
          </div> */}
        </div>
      </body>
    </>
  );
};
export default Sidebar;
