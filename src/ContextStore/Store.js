
import React from "react";

const Context = React.createContext({
  Messages: [],
  AddMesages: () => {},
  UpdateLastMessage: () => {},
  loader: false,
  Setloader: () => {},
  clearFun: () => {},
});

export default Context;
