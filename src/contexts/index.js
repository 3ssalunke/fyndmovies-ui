import { createContext, useReducer } from "react";
import { initialState, moviesReducer } from "./reducer";

export const GlobalContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};
