import React from "react";

const Context = React.createContext({
  Messages: [],
  AddMesages: () => {},
  loader: false,
  Setloader: () => {},
});
export default Context;
