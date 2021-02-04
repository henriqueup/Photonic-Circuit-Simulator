import { put, takeEvery } from "redux-saga/effects";
import { getCircuitComponentData } from "..";
import { setPower } from "../ducks/circuitComponent";

function* savePlannedOutputsSaga(action) {
  const power = action.payload.plannedOutputs[0].power;
  const outputPortID = getCircuitComponentData(action.payload.powerSourceID)
    .outputs[0];

  yield put(setPower(action.payload.powerSourceID, outputPortID, power));
}

export function* watchSavePlannedOutputs() {
  yield takeEvery("powerSourcePlannedOutputs/SAVE", savePlannedOutputsSaga);
}
