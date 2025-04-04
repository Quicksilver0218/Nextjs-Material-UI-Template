import { Reducer } from "react";
import IAction from "./action";

export function combineReducers<T> (reducerMap: {
  [Property in keyof T]: Reducer<T[Property], IAction>;
}): Reducer<T, IAction> {
  return (state: T, action: IAction) => {
    const newState = { ...state };
    for (const key in reducerMap)
      newState[key] = reducerMap[key](state[key], action);
    return newState;
  };
};
