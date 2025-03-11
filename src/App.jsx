import { useState } from "react";
import Sidebar from "./Component/Sidebar/Sidebar.jsx";
import "./App.css";
import Main from "./Component/Main/Main.jsx";
import ChatGPTPage from "./Component/Sidebar/Sidebar.jsx";
import ContextProvider from "./ContextStore/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Sidebar />
      <Main />
    </ContextProvider>
  );
}

export default App;
