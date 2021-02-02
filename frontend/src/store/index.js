import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import circuitComponent from "./ducks/circuitComponent";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import circuit from "./ducks/circuit";
import port from "./ducks/port";
import connection from "./ducks/connection";
import powerSourcePlannedOutputs from "./ducks/powerSourcePlannedOutputs";

const reducers = combineReducers({
  circuitComponent,
  circuit,
  port,
  connection,
  powerSourcePlannedOutputs,
});

export default reducers;

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export const getPortData = (portID) => {
  return store.getState().port.instances.find((port) => port.id === portID);
};

export const getPlannedOutput = (powerSourceID) => {
  return store
    .getState()
    .powerSourcePlannedOutputs.instances.find(
      (instance) => instance.id === powerSourceID
    )?.plannedOutputs;
};
