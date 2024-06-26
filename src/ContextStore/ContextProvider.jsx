import React, { useState } from "react";
import Context from "./Store";

const ContextProvider = (props) => {
  const [messages, SetMessages] = useState([]);
  const [loading, Setloading] = useState(false);

  const AddMesages = (messages) => {
    SetMessages((prev) => [...prev, messages]);
  };

  const setloading = () => {
    Setloading((prev) => !prev);
  };
  const ClearFun = () => {
    SetMessages([]);
  };

  const context = {
    Messages: messages,
    AddMesages: AddMesages,
    loader: loading,
    Setloader: Setloading,
    clearFun: ClearFun,
  };
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};
export default ContextProvider;
