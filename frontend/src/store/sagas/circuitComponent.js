import {
  takeEvery,
  call,
  put,
  all,
  actionChannel,
  take,
} from "redux-saga/effects";
import { store } from "..";
import api from "../../api";
import { addComponent, setSaved } from "../ducks/circuit";
import {
  confirmCreation,
  confirmSelectedDelete,
  createWithData,
  deselect,
  setOutputsUpToDate,
  setSelected,
} from "../ducks/circuitComponent";
import { deleteConnection } from "../ducks/connection";
import {
  changePower,
  create as createPorts,
  deletePort,
  setWorldTransform,
} from "../ducks/port";
import { savePlannedOutputs } from "../ducks/powerSourcePlannedOutputs";
import { createPlannedOutput } from "../../utils/powerSource";

export function* helloSaga() {
  yield console.log("Sagas working!");
}

function* createCircuitComponentSaga(action) {
  const response = yield call(api.postComponent, action.payload.kind);

  if (response.ok) {
    const circuitComponent = response.body;

    const data = {
      ...circuitComponent,
      inputs: circuitComponent.inputs.map((port) => port.id),
      outputs: circuitComponent.outputs.map((port) => port.id),
    };

    yield put(createWithData(data));
    yield put(addComponent(circuitComponent.id));

    yield put(
      createPorts(
        circuitComponent.inputs,
        circuitComponent.id,
        circuitComponent.kind,
        true
      )
    );
    yield put(
      createPorts(
        circuitComponent.outputs,
        circuitComponent.id,
        circuitComponent.kind,
        false
      )
    );

    if (circuitComponent.kind === "power_source") {
      yield put(
        savePlannedOutputs(circuitComponent.id, [createPlannedOutput(0, 0)])
      );
    }

    yield put(confirmCreation(circuitComponent.id));
    yield put(setSaved(false));
  }
}

export function* watchCreateCircuitComponent() {
  yield takeEvery("circuitComponent/CREATE", createCircuitComponentSaga);
}

function* updatePosSaga(action) {
  const response = yield call(
    api.setPosition,
    action.payload.id,
    action.payload.x,
    action.payload.y
  );

  if (response.ok) {
    const circuitComponent = store
      .getState()
      .circuitComponent.instances.find(
        (instance) => instance.id === action.payload.id
      );

    yield all(
      circuitComponent.inputs.map((portID) =>
        put(setWorldTransform(portID, action.payload.x, action.payload.y))
      )
    );
    yield all(
      circuitComponent.outputs.map((portID) =>
        put(setWorldTransform(portID, action.payload.x, action.payload.y))
      )
    );

    yield put(setSaved(false));
  }
}

export function* watchUpdatePos() {
  yield takeEvery("circuitComponent/UPDATE_POS", updatePosSaga);
}

function* selectSaga(action) {
  const selected = store.getState().circuitComponent.selected;
  if (selected) {
    yield put(deselect(selected.id));
  }

  yield put(setSelected(action.payload.id));
}

export function* watchSelect() {
  yield takeEvery("circuitComponent/SELECT", selectSaga);
}

function* setPowerSaga(action) {
  const response = yield call(
    api.setPower,
    action.payload.componentID,
    action.payload.power
  );

  if (response.ok) {
    yield put(changePower(action.payload.portID, action.payload.power));
  }
}

function* calculateOutputsSaga(action) {
  const response = yield call(api.calculateOutputs, action.payload.id);

  if (response.ok) {
    const body = response.body;

    if (body && body.outputs && body.outputs.length) {
      yield all(
        body.outputs.map((power, i) =>
          put(changePower(action.payload.outputIDs[i], power))
        )
      );
      yield put(setOutputsUpToDate(action.payload.id, true));
    } else {
      console.log(`Invalid responseBody: ${body}`);
    }
  }
}

export function* watchCalculateOutputsAndSetPower() {
  const channel = yield actionChannel([
    "circuitComponent/CALCULATE_OUTPUTS",
    "circuitComponent/SET_POWER",
  ]);
  while (true) {
    const action = yield take(channel);
    switch (action.type) {
      case "circuitComponent/CALCULATE_OUTPUTS":
        yield call(calculateOutputsSaga, action);
        break;
      case "circuitComponent/SET_POWER":
        yield call(setPowerSaga, action);
        break;
      default:
        break;
    }
  }
}

function* deleteSelectedSaga() {
  const selected = store.getState().circuitComponent.selected;
  if (selected === null) return;

  const response = yield call(api.deleteComponent, selected.id);

  if (response.ok) {
    yield put(confirmSelectedDelete());

    for (const portID of selected.inputs) {
      yield put(deleteConnection(portID));
      yield put(deletePort(portID));
    }

    for (const portID of selected.outputs) {
      yield put(deleteConnection(portID));
      yield put(deletePort(portID));
    }
  }
}

export function* watchDeleteSelected() {
  yield takeEvery("circuitComponent/DELETE_SELECTED", deleteSelectedSaga);
}
