import { combineReducers } from "redux";
import counter, { MODULE_KEY as COUNTER_KEY } from "./counter";
import about, { MODULE_KEY as ABOUT_KEY } from "./about";

export interface GlobalState {
  [COUNTER_KEY]: ReturnType<typeof counter>;
  [ABOUT_KEY]: ReturnType<typeof about>;
}

const rootReducer = combineReducers({
  [COUNTER_KEY]: counter,
  [ABOUT_KEY]: about
});

export default rootReducer;
