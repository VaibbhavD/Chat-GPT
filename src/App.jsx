import { useState } from "react";
import Sidebar from "./Component/Sidebar";
import "./App.css";
import Main from "./Component/Main";
import ChatGPTPage from "./Component/Sidebar";
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
