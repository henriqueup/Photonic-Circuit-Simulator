import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import circuitComponent from "./ducks/circuitComponent";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import circuit from "./ducks/circuit";

const reducers = combineReducers({
  circuitComponent,
  circuit,
});

export default reducers;

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancer(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
