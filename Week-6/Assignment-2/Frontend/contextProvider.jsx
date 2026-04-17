import { createContext, useState } from "react";

// create context
export const counterContextObj = createContext();

function ContextProvider({ children }) {
  // state
  const [counter, setCounter] = useState(10);

  // function to change state
  const changeCounter = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <counterContextObj.Provider value={{ counter, changeCounter }}>
      {children}
    </counterContextObj.Provider>
  );
}

export default ContextProvider;