const Chatgpt_res = () => {
  return (
    <div class="flex w-full mt-2 space-x-3 max-w-xl m-4 font-semibold mb-4 ">
      <div class="flex-shrink-0 h-10 w-10 rounded-full flex justify-center items-center">
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.n6aTpKW4pOfH1J91PU5yhwAAAA&pid=Api&P=0&h=180"
          alt="image"
          className="w-5"
        />
      </div>
      <div>
        <span class="font-bold ">ChatGPT</span>
        <div class=" p-3 rounded-r-lg rounded-bl-lg">
          <p class="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        {/* <span class="text-xs text-gray-500 leading-none">2 min ago</span> */}
      </div>
    </div>
  );
};
export default Chatgpt_res;
