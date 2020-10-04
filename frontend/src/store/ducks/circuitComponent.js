import createCircuitComponent from "../../models/CircuitComponent";
import { create as createPort } from "./port";
import { CIRCUIT_COMPONENT_WIDTH } from "../../models/CircuitComponent";
import { store } from "../../store";

// Action Types
export const Types = {
  CREATE: "circuitComponent/CREATE",
  SETX: "circuitComponent/SETX",
  UPDATE_POS: "circuitComponent/UPDATE_POS",
};

// Reducer
const INITIAL_STATE = {
  instances: [],
  basicKinds: ["Switch N", "Switch P", "Power Source"],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE:
      return {
        ...state,
        instances: state.instances.concat([createCircuitComponent(action.payload.ports)]),
      };
    case Types.SETX:
      return {
        ...state,
        instances: state.instances.map((content, i) => (i === 0 ? { ...content, x: 50 } : content)),
      };
    case Types.UPDATE_POS:
      return {
        ...state,
        instances: state.instances.map((content, i) =>
          i === 0
            ? {
                ...content,
                x: action.payload.x,
                y: action.payload.y,
              }
            : content
        ),
      };
    default:
      return state;
  }
}

// Action Creators
export function create() {
  store.dispatch(createPort(8));
  store.dispatch(createPort(8, false, CIRCUIT_COMPONENT_WIDTH));

  let ports = [];
  let allPorts = store.getState().port.ports;
  ports.push(allPorts[allPorts.length - 1]);
  ports.push(allPorts[allPorts.length - 2]);

  return {
    type: Types.CREATE,
    payload: {
      ports: ports,
    },
  };
}
export function setX() {
  return {
    type: Types.SETX,
    payload: {},
  };
}
export function updatePos(x, y) {
  return {
    type: Types.UPDATE_POS,
    payload: {
      x: x,
      y: y,
    },
  };
}
