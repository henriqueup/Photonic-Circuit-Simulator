import { all } from "redux-saga/effects";
import { watchCreateCircuit, watchSaveCircuit } from "./circuit";
import { helloSaga, watchCalculateOutputs, watchCreateCircuitComponent, watchSelect, watchSetPower, watchUpdatePos } from "./circuitComponent";
import { watchCreateConnection } from "./connection";
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
    watchCalculateOutputs()
  ]);
}
