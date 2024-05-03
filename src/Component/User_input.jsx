const UserInput = () => {
  return (
    <div class="flex w-full mt-2 space-x-3 max-w-xl ml-auto justify-end m-2">
      <div>
        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p class="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.
          </p>
        </div>
        <span class="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
        <img src="https://tse4.mm.bing.net/th?id=OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH&pid=Api&P=0&h=180" />
      </div>
    </div>
  );
};
export default UserInput;
