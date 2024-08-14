import { useContext, useState } from "react";
import Context from "../../ContextStore/Store";

const Sidebar = () => {
  const [active, setActive] = useState(true);
  const context = useContext(Context);

  function openSidebar() {
    // document.querySelector(".sidebar").classList.toggle("hidden");
    setActive((prev) => !prev);
  }

  const ClearHandler = () => {
    context.clearFun();
  };

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
            <div class="p-2.5 mt-1 flex items-center gap-2">
              {/* <i class=" px-2 py-1 rounded-md bg-blue-600"> */}
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width={30}
              >
                <path
                  d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
                  fill="url(#prefix__paint0_radial_980_20147)"
                />
                <defs>
                  <radialGradient
                    id="prefix__paint0_radial_980_20147"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
                  >
                    <stop offset=".067" stop-color="#9168C0" />
                    <stop offset=".343" stop-color="#5684D1" />
                    <stop offset=".672" stop-color="#1BA1E3" />
                  </radialGradient>
                </defs>
              </svg>
              {/* </i> */}
              <img
                src="https://1000logos.net/wp-content/uploads/2024/02/Gemini-Logo-768x432.png"
                width={80}
                // className="m-auto?"
              />
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
          <div
            class="p-2.5 mt-3 flex items-center justify-between rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={ClearHandler}
          >
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
