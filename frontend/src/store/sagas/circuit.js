import { takeEvery, call, put } from "redux-saga/effects";
import api from "../../api";
import { createWithID, save, setCurrent, setLabel } from "../ducks/circuit";
import { store } from "..";
import { calculateOutputs } from "../ducks/circuitComponent";

function* createCircuitSaga() {
  const response = yield call(api.postCircuit);

  if (response.ok) {
    const body = response.body;

    yield put(createWithID(body.id));
    yield put(setCurrent(body.id));
  }
}

export function* watchCreateCircuit() {
  yield takeEvery("circuit/CREATE", createCircuitSaga);
}

function* saveCircuitSaga() {
  const response = yield call(api.saveCircuit);

  if (response.ok) {
    yield put(save());
  }
}

export function* watchSaveCircuit() {
  yield takeEvery("circuit/ATTEMPT_SAVE", saveCircuitSaga);
}

function* simulateComponent(currentComponent, components, ports, coverageMap) {
  const inputs = currentComponent.inputs.map((input) => ports.find((port) => port.id === input)).filter((input) => input.target);
  for (const input of inputs) {
    const targetPort = ports.find((port) => port.id === input.target);
    const targetComponent = components.find((component) => component.id === targetPort.parentID);
    if (coverageMap[components.indexOf(targetComponent)] === false) {
      yield* simulateComponent(targetComponent, components, ports, coverageMap);
    }
  }

  coverageMap[components.indexOf(currentComponent)] = true;
  yield put(calculateOutputs(currentComponent.id, currentComponent.outputs));

  const outputs = currentComponent.outputs.map((output) => ports.find((port) => port.id === output)).filter((output) => output.target);
  for (const output of outputs) {
    const targetPort = ports.find((port) => port.id === output.target);
    const targetComponent = components.find((component) => component.id === targetPort.parentID);
    if (coverageMap[components.indexOf(targetComponent)] === false) {
      yield* simulateComponent(targetComponent, components, ports, coverageMap);
    }
  }
}

function* simulateSaga() {
  const switchKinds = ["swn", "swp"];
  const components = store.getState().circuitComponent.instances.filter((instance) => switchKinds.includes(instance.kind.kind));
  const ports = store.getState().port.instances;
  const coverageMap = components.map((i) => false);

  while (coverageMap.includes(false)) {
    let currentComponent = components[coverageMap.indexOf(false)];
    yield* simulateComponent(currentComponent, components, ports, coverageMap);
  }
}

export function* watchSimulate() {
  yield takeEvery("circuit/SIMULATE", simulateSaga);
}

function* setCircuitLabelSaga(action) {
  const response = yield call(api.setCircuitLabel, action.payload.label);

  if (response.ok) {
    yield put(setLabel(action.payload.label));
  }
}

export function* watchSetCircuitLabel() {
  yield takeEvery("circuit/ATTEMPT_SET_LABEL", setCircuitLabelSaga);
}
