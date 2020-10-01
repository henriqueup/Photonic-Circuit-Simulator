import { combineReducers, createStore } from "redux";
import circuitComponent from "./ducks/circuitComponent";

const reducers = combineReducers({
  circuitComponent,
});

export default reducers;

export const store = createStore(reducers);
