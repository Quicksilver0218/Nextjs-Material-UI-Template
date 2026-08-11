// This file is an example of action declaration.

import IAction from ".";

export const ActionType = {
  INCREMENT: "Increment",
  DECREMENT: "Decrement",
  RESET: "Reset",
  SET: "Set",
} as const;
export type ActionType = typeof ActionType[keyof typeof ActionType];

export interface SetAction extends IAction {
  num: number;
};

// Action creaters here
export const Set = (num: number): SetAction => ({
  type: ActionType.SET,
  num
});