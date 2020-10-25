import { takeEvery, call, put, all } from "redux-saga/effects";
import api from "../../api";
import { addConnection, createWithData, createWithID, save, setCurrent, setLabel } from "../ducks/circuit";
import { create as createPorts } from "../ducks/port";
import { create as createConnection } from "../ducks/connection";
import { store } from "..";
import { calculateOutputs, confirmCreation, createWithData as createComponentWithData } from "../ducks/circuitComponent";
import createPortModels, { PORT_WIDTH } from "../../models/Port";

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

function* loadCircuitSaga(action) {
  const response = yield call(api.loadCircuit, action.payload.id);

  if (response.ok) {
    const components = response.body.components;
    let inputsWithConnection = [];
    let outputsWithConnection = [];
    let connections = [];

    for (const component of components) {
      yield put(createPorts(component.inputs, component.id, component.kind, true));
      yield put(createPorts(component.outputs, component.id, component.kind, false));

      const inputModels = createPortModels(component.inputs, component.id, component.kind, true, component.x, component.y);
      const outputModels = createPortModels(component.outputs, component.id, component.kind, false, component.x, component.y);
      inputsWithConnection = inputsWithConnection.concat(inputModels.filter((port) => port.target !== null));
      outputsWithConnection = outputsWithConnection.concat(outputModels.filter((port) => port.target !== null));

      const componentData = {
        ...component,
        inputs: component.inputs.map((port) => port.id),
        outputs: component.outputs.map((port) => port.id),
      };
      yield put(createComponentWithData(componentData));
      yield put(confirmCreation(component.id));
    }

    for (const input of inputsWithConnection) {
      const targetPort = outputsWithConnection.find((output) => output.id === input.target);

      const points = [
        targetPort.worldX + PORT_WIDTH / 2,
        targetPort.worldY + PORT_WIDTH / 2,
        input.worldX + PORT_WIDTH / 2,
        input.worldY + PORT_WIDTH / 2,
      ];
      yield put(createConnection(points, targetPort.id, input.id));
      connections.push({ points: points, originPortID: targetPort.id, targetPortID: input.id });
    }

    const data = {
      ...response.body,
      components: components.map((component) => component.id),
      connections: [],
      isSaved: true,
    };
    yield put(createWithData(data));
    yield all(connections.map((connection) => put(addConnection(connection))));
  }
}

export function* watchLoadCircuit() {
  yield takeEvery("circuit/LOAD", loadCircuitSaga);
}
