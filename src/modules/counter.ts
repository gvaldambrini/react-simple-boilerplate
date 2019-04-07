import { Action, AnyAction } from "redux";

// ------------------------------------
// Constants

export const MODULE_KEY = "counter";

const COUNTER_INCREMENT = "counter/COUNTER_INCREMENT";

// ------------------------------------
// Action creators

interface ActionIncrement extends Action {
  payload: number;
}

export function increment(value: number = 1): ActionIncrement {
  return {
    type: COUNTER_INCREMENT,
    payload: value
  };
}

// ------------------------------------
// Store

export interface AnyState {
  [MODULE_KEY]: CounterState;
  [extraProps: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface CounterState {
  readonly counter: number;
}

// ------------------------------------
// Selectors

const local = (state: AnyState): CounterState => state[MODULE_KEY];

export const getCounter = (state: AnyState): number => local(state).counter;

// ------------------------------------
// Reducers

const initialState = {
  counter: 0
};

export default function reducer(
  state = initialState,
  action: AnyAction
): CounterState {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return {
        ...state,
        counter: state.counter + action.payload
      };
    default:
      return state;
  }
}
