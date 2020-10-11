import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import circuitComponent from "./ducks/circuitComponent";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import circuit from "./ducks/circuit";
import port from "./ducks/port";
import connection from "./ducks/connection";

const reducers = combineReducers({
  circuitComponent,
  circuit,
  port,
  connection
});

export default reducers;

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancer(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
