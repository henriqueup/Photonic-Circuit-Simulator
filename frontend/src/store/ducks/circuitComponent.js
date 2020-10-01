import createCircuitComponent from "../../models/CircuitComponent";

// Action Types
export const Types = {
  CREATE: "circuitComponent/CREATE",
  SETX: "circuitComponent/SETX",
  UPDATE_POS: "circuitComponent/UPDATE_POS",
};

// Reducer
const INITIAL_STATE = {
  circuitComponents: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE:
      return {
        ...state,
        circuitComponents: state.circuitComponents.concat([createCircuitComponent()]),
      };
    case Types.SETX:
      return {
        ...state,
        circuitComponents: state.circuitComponents.map((content, i) => (i === 0 ? { ...content, x: 50 } : content)),
      };
    case Types.UPDATE_POS:
      return {
        ...state,
        circuitComponents: state.circuitComponents.map((content, i) =>
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
  return {
    type: Types.CREATE,
    payload: {},
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
