
import React, { useState } from "react";
import Context from "./Store";

const ContextProvider = (props) => {
  const [messages, SetMessages] = useState([]);
  const [loading, Setloading] = useState(false);

  // Add new message
  const AddMesages = (message) => {
    SetMessages((prev) => [...prev, message]);
  };

  // Update last AI message
  const UpdateLastMessage = (updatedMessage) => {
    SetMessages((prev) => {
      if (prev.length === 0) return prev;

      const updated = [...prev];

      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        ...updatedMessage,
      };

      return updated;
    });
  };

  // Clear all messages
  const ClearFun = () => {
    SetMessages([]);
    Setloading(false);
  };

  const context = {
    Messages: messages,
    AddMesages: AddMesages,
    UpdateLastMessage: UpdateLastMessage,
    loader: loading,
    Setloader: Setloading,
    clearFun: ClearFun,
  };

  return (
    <Context.Provider value={context}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
