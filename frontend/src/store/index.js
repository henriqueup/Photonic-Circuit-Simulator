import { combineReducers, createStore, applyMiddleware } from "redux";
import circuitComponent from "./ducks/circuitComponent";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import port from "./ducks/port";
import circuit from "./ducks/circuit";

const reducers = combineReducers({
  circuitComponent,
  port,
  circuit,
});

export default reducers;

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
