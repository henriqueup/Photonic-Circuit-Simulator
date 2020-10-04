import { all } from "redux-saga/effects";
import { helloSaga, watchCreateCircuitComponent } from "./sagas";

export default function* rootSaga() {
  yield all([helloSaga(), watchCreateCircuitComponent()]);
}
