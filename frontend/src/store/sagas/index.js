import { all } from "redux-saga/effects";
import { watchCreateCircuit, watchLoadCircuit, watchSaveCircuit, watchSetCircuitLabel, watchSimulate } from "./circuit";
import {
  helloSaga,
  watchCalculateOutputs,
  watchCreateCircuitComponent,
  watchDeleteSelected,
  watchSelect,
  watchSetPower,
  watchUpdatePos,
} from "./circuitComponent";
import { watchCreateConnection, watchDeleteConnection } from "./connection";
import { watchChangePower, watchSetWorldTransform } from "./port";

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
    watchSetPower(),
    watchChangePower(),
    watchCalculateOutputs(),
    watchSimulate(),
    watchDeleteSelected(),
    watchDeleteConnection(),
    watchSetCircuitLabel(),
    watchLoadCircuit(),
  ]);
}
