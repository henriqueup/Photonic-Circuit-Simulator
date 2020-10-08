import createCircuitComponent from "../../models/CircuitComponent";

// Action Types
export const Types = {
  CREATE: "circuitComponent/CREATE",
  CREATE_WITH_DATA: "circuitComponent/CREATE_WITH_DATA",
  UPDATE_POS: "circuitComponent/UPDATE_POS",
};

// Reducer
const INITIAL_STATE = {
  instances: [],
  basicKinds: [
    {
      name: "Switch N",
      kind: "swn",
    },
    {
      name: "Switch P",
      kind: "swp",
    },
    {
      name: "Power Source",
      kind: "power_source",
    },
  ],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE_WITH_DATA:
      return {
        ...state,
        instances: state.instances.concat([createCircuitComponent(action.payload.data)]),
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
export function create(kind) {
  return {
    type: Types.CREATE,
    payload: {
      kind: kind,
    },
  };
}

export function createWithData(data) {
  return {
    type: Types.CREATE_WITH_DATA,
    payload: {
      data: data,
    },
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
