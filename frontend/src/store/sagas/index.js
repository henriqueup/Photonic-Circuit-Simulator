import { all } from "redux-saga/effects";
import { watchCreateCircuit, watchSaveCircuit } from "./circuit";
import { helloSaga, watchCreateCircuitComponent } from "./circuitComponent";

export default function* rootSaga() {
  yield all([helloSaga(), watchCreateCircuitComponent(), watchCreateCircuit(), watchSaveCircuit()]);
}
