import { takeEvery, call, put } from "redux-saga/effects";
import api from "../../api";
import createPort, { PORT_WIDTH } from "../../models/Port";
import { addComponent } from "../ducks/circuit";
import { createWithData } from "../ducks/circuitComponent";

export function* helloSaga() {
  console.log("Sagas working!");
}

function* createCircuitComponentSaga(action) {
  const circuitComponent = yield call(api.postComponent, action.payload.kind);
  console.log(circuitComponent);

  const data = {
    ...circuitComponent,
    inputs: circuitComponent.inputs.map((port, i) => createPort(i * PORT_WIDTH * 2, port, circuitComponent.kind, true)),
    outputs: circuitComponent.outputs.map((port, i) => createPort(i * PORT_WIDTH * 2, port, circuitComponent.kind, false)),
  };
  yield put(createWithData(data));
  yield put(addComponent(circuitComponent.id));
}

export function* watchCreateCircuitComponent() {
  yield takeEvery("circuitComponent/CREATE", createCircuitComponentSaga);
}
