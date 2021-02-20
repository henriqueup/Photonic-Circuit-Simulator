import { all } from "redux-saga/effects";
import {
  watchAttemptChangeCurrentCircuit,
  watchCreateCircuit,
  watchLoadCircuit,
  watchSaveCircuit,
  watchSetCircuitLabel,
  watchSimulate,
} from "./circuit";
import {
  helloSaga,
  watchCreateCircuitComponent,
  watchDeleteSelected,
  watchSelect,
  watchCalculateOutputs_SetPower_MeasureSimulationValues,
  watchUpdatePos,
  watchSetLabel,
} from "./circuitComponent";
import { watchCreateConnection, watchDeleteConnection } from "./connection";
import { watchSetWorldTransform } from "./port";
import { watchSavePlannedOutputs } from "./powerSourcePlannedOutputs";

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchCreateCircuitComponent(),
    watchCreateCircuit(),
    watchSaveCircuit(),
    watchCreateConnection(),
    watchUpdatePos(),
    watchSetWorldTransform(),
    watchSelect(),
    watchCalculateOutputs_SetPower_MeasureSimulationValues(),
    watchSimulate(),
    watchDeleteSelected(),
    watchDeleteConnection(),
    watchSetCircuitLabel(),
    watchLoadCircuit(),
    watchAttemptChangeCurrentCircuit(),
    watchSavePlannedOutputs(),
    watchSetLabel(),
  ]);
}
