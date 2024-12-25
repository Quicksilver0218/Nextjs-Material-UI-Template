import IAction from ".";

export enum ActionType {
  INCREMENT = 'Increment',
  DECREMENT = 'Decrement',
  RESET = 'Reset',
  SET = 'Set',
};

export interface SetAction extends IAction {
  num: number;
};

// Action creaters here
export const Set = (num: number): SetAction => ({
  type: ActionType.SET,
  num
});