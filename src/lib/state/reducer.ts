import { IState } from ".";
import IAction from "./action";
import * as Accumulator from "./action/accumulator";
import { combineReducers } from "./utils";

// Implement your reducers here
function accumulatorReducer (accumulator: number, action: IAction) {
  switch (action.type) {
    case Accumulator.ActionType.INCREMENT:
      return accumulator + 1;
    case Accumulator.ActionType.DECREMENT:
      return accumulator - 1;
    case Accumulator.ActionType.RESET:
      return 0;
    case Accumulator.ActionType.SET:
      return (action as Accumulator.SetAction).num;
    default:
      return accumulator;
  }
};

function changeCountReducer (changeCount: number, action: IAction) {
  switch (action.type) {
    case Accumulator.ActionType.INCREMENT:
    case Accumulator.ActionType.DECREMENT:
    case Accumulator.ActionType.SET:
      return changeCount + 1;
    case Accumulator.ActionType.RESET:
      return 0;
    default:
      return changeCount;
  }
};

const dev = process.env.NODE_ENV !== "production";
const reducer = dev
  ? (state: IState, action: IAction) => {
    console.log("%c before", "color: #ff6666; font-weight: bold;", state);
    console.log("%c action", "color: orange; font-weight: bold;", action);
    const newState = combineReducers({
      accumulator: accumulatorReducer,
      changeCount: changeCountReducer,
    })(state, action);
    console.log("%c after", "color: #44bb44; font-weight: bold;", newState);
    return newState;
  } : combineReducers({
    accumulator: accumulatorReducer,
    changeCount: changeCountReducer,
  });

export default reducer;
