import React from "react";

function Loader() {
  return (
    <div class="flex gap-2">
      <div class="w-4 h-4 rounded-full animate-pulse bg-gray-600"></div>
      <div class="w-4 h-4 rounded-full animate-pulse bg-gray-600"></div>
      <div class="w-4 h-4 rounded-full animate-pulse bg-gray-600"></div>
    </div>
  );
}

export default Loader;
