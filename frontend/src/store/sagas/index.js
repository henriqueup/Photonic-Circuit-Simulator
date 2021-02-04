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
  watchCalculateOutputsAndSetPower,
  watchUpdatePos,
} from "./circuitComponent";
import { watchCreateConnection, watchDeleteConnection } from "./connection";
import { watchChangePower, watchSetWorldTransform } from "./port";
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
    watchChangePower(),
    watchCalculateOutputsAndSetPower(),
    watchSimulate(),
    watchDeleteSelected(),
    watchDeleteConnection(),
    watchSetCircuitLabel(),
    watchLoadCircuit(),
    watchAttemptChangeCurrentCircuit(),
    watchSavePlannedOutputs(),
  ]);
}
