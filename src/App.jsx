import { useState } from "react";
import Sidebar from "./Component/Sidebar";
import "./App.css";
import Main from "./Component/Main";
import ChatGPTPage from "./Component/Sidebar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ChatGPTPage />
      <Main />
    </div>
  );
}

export default App;
