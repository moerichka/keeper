import React from "react";
import { createContext, useReducer } from "react";
import NoteReducer from "./NoteReducer";
import { INote, IAction } from "../types/note";

interface IState {
    state: INote[];
    dispatch: (action: IAction)=> void
}

const INITIAL_STATE : IState = {state: [], dispatch: ()=>{}};

export const NoteContext = createContext(INITIAL_STATE);

export const NoteContextProvider = ({ children } : {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer<React.Reducer<INote[], IAction>>(
    NoteReducer,
    []
  );

  return (
    <NoteContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
