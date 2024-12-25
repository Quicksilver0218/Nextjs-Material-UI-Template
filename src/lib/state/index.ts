interface IState {
  [key: string]: any;
  // Shape your state here
  accumulator: number;
  changeCount: number;
}

const initialState: IState = {
  // Set your initial state here
  accumulator: 0,
  changeCount: 0,
};

export type { IState };
export { initialState };
