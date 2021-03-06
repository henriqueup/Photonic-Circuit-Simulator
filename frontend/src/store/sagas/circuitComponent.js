import {
  takeEvery,
  call,
  put,
  all,
  actionChannel,
  take,
} from "redux-saga/effects";
import {
  getCurrentCircuitID,
  getCurrentReaderAndSourceValuesAndIDs,
  getPortData,
  store,
} from "..";
import api from "../../api";
import { addComponent, setSaved } from "../ducks/circuit";
import {
  confirmCreation,
  confirmSelectedDelete,
  createWithData,
  deselect,
  setOutputsUpToDate,
  setSelected,
  Types as ComponentTypes,
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
import { addSimulationValues, setValueLabel } from "../ducks/simulation";

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
  yield takeEvery(ComponentTypes.CREATE, createCircuitComponentSaga);
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
  yield takeEvery(ComponentTypes.UPDATE_POS, updatePosSaga);
}

function* selectSaga(action) {
  const selected = store.getState().circuitComponent.selected;
  if (selected) {
    yield put(deselect(selected.id));
  }

  yield put(setSelected(action.payload.id));
}

export function* watchSelect() {
  yield takeEvery(ComponentTypes.SELECT, selectSaga);
}

function* setPowerSaga(action) {
  const response = yield call(
    api.setPower,
    action.payload.componentID,
    action.payload.power
  );

  if (response.ok) {
    const port = getPortData(action.payload.portID);

    yield put(changePower(port.id, action.payload.power));
    if (port.target) {
      yield put(changePower(port.target, action.payload.power));
    }
  }
}

function* calculateOutputsSaga(action) {
  const response = yield call(api.calculateOutputs, action.payload.id);

  if (response.ok) {
    const body = response.body;

    if (body && body.outputs && body.outputs.length) {
      for (let i = 0; i < body.outputs.length; i++) {
        const port = getPortData(action.payload.outputIDs[i]);

        yield put(changePower(port.id, body.outputs[i]));
        if (port.target) {
          yield put(changePower(port.target, body.outputs[i]));
        }
      }

      yield put(setOutputsUpToDate(action.payload.id, true));
    } else {
      console.log(`Invalid responseBody: ${body}`);
    }
  }
}

function* measureSimulationValuesSaga(action) {
  const values = getCurrentReaderAndSourceValuesAndIDs();
  const currentCircuitID = getCurrentCircuitID();

  yield put(addSimulationValues(action.payload.time, values, currentCircuitID));
}

export function* watchCalculateOutputs_SetPower_MeasureSimulationValues() {
  const channel = yield actionChannel([
    ComponentTypes.CALCULATE_OUTPUTS,
    ComponentTypes.SET_POWER,
    "simulation/MEASURE_VALUES",
  ]);

  while (true) {
    const action = yield take(channel);

    switch (action.type) {
      case ComponentTypes.CALCULATE_OUTPUTS:
        yield call(calculateOutputsSaga, action);
        break;
      case ComponentTypes.SET_POWER:
        yield call(setPowerSaga, action);
        break;
      case "simulation/MEASURE_VALUES":
        yield call(measureSimulationValuesSaga, action);
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
  yield takeEvery(ComponentTypes.DELETE_SELECTED, deleteSelectedSaga);
}

function* setLabelSaga(action) {
  const selected = store.getState().circuitComponent.selected;
  if (selected === null) return;

  const response = yield call(api.setLabel, selected.id, action.payload.label);
  if (response.ok) {
    yield put(setSaved(false));

    if (selected.kind.kind === "output_reader") {
      const targetID = getPortData(selected.inputs[0])?.target;
      yield put(setValueLabel(targetID, action.payload.label));
    }
    if (selected.kind.kind === "power_source") {
      const targetID = getPortData(selected.outputs[0])?.target;
      yield put(setValueLabel(targetID, action.payload.label));
    }
  }
}

export function* watchSetLabel() {
  yield takeEvery(ComponentTypes.SET_LABEL, setLabelSaga);
}
