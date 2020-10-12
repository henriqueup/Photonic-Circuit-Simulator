import { all } from "redux-saga/effects";
import { watchCreateCircuit, watchSaveCircuit } from "./circuit";
import { helloSaga, watchCreateCircuitComponent, watchSelect, watchSetPower, watchUpdatePos } from "./circuitComponent";
import { watchCreateConnection } from "./connection";
import { watchChangeOutput, watchSetWorldTransform } from "./port";

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
    watchChangeOutput()
  ]);
}
