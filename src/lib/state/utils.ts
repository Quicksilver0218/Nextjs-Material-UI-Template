import { Reducer } from "react";
import IAction from "./action";

export const combineReducers = (reducerMap: {
  [key: string]: Reducer<any, IAction>;
}): Reducer<any, IAction> => {
  return (state: any, action: IAction) => {
    const newState = { ...state };
    Object.keys(reducerMap).forEach((key) => (newState[key] = reducerMap[key](state[key], action)));
    return newState;
  };
};
