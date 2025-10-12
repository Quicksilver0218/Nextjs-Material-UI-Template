"use client";

import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from "react";
import IAction from "@/lib/state/action";
import { IState, initialState } from "@/lib/state";
import reducer from "@/lib/state/reducer";

const store = createContext(
  {} as { state: IState; dispatch: Dispatch<IAction> },
);

export function StateProvider({ children }: PropsWithChildren<object>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { Provider } = store;
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export function useStore() {
  return useContext(store);
}