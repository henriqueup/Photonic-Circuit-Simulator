import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import circuitComponent from "./ducks/circuitComponent";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import circuit from "./ducks/circuit";
import port from "./ducks/port";
import connection from "./ducks/connection";
import powerSourcePlannedOutputs from "./ducks/powerSourcePlannedOutputs";
import simulation from "./ducks/simulation";

const reducers = combineReducers({
  circuitComponent,
  circuit,
  port,
  connection,
  powerSourcePlannedOutputs,
  simulation,
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

export const getCircuitComponentData = (id) => {
  return store
    .getState()
    .circuitComponent.instances.find((instance) => instance.id === id);
};

export const getCurrentReaderValuesAndIDs = () => {
  const currentStoreState = store.getState();
  const currentCircuitID = currentStoreState.circuit.current;

  const currentCircuitComponentsIDs = currentStoreState.circuit.instances.find(
    (circuit) => circuit.id === currentCircuitID
  ).components;

  const outputReaders = currentStoreState.circuitComponent.instances.filter(
    (instance) =>
      instance.kind.kind === "output_reader" &&
      currentCircuitComponentsIDs.includes(instance.id)
  );

  return currentStoreState.port.instances
    .filter((port) =>
      outputReaders.map((reader) => reader.id).includes(port.parentID)
    )
    .map((port) => {
      return {
        id: port.target,
        power: port.power,
      };
    });
};

export const getCurrentCircuitID = () => {
  return store.getState().circuit.current;
};
