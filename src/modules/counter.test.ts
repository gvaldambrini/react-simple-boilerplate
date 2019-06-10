import { Action } from "redux";
import reducer, { increment, getCounter } from "./counter";

test("handle the increment action without value", (): void => {
  const initialState = {
    counter: 3
  };
  const newState = reducer(initialState, increment());
  expect(newState.counter).toEqual(4);
});

test("handle the increment action with a value", (): void => {
  const initialState = {
    counter: 3
  };
  const newState = reducer(initialState, increment(5));
  expect(newState.counter).toEqual(8);
});

test("handle an unknown action", (): void => {
  const action: Action = { type: "fake" };
  const newState = reducer(undefined, action);
  expect(newState.counter).toEqual(0);
});

test("get the counter", (): void => {
  const counterState = {
    counter: 5
  };

  expect(getCounter({ counter: counterState })).toEqual(5);
});
