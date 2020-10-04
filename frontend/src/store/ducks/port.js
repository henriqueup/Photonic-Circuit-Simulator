import createPort from "../../models/Port";

// Action Types
export const Types = {
  CREATE: "port/CREATE",
};

// Reducer
const INITIAL_STATE = {
  ports: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE:
      return {
        ...state,
        ports: state.ports.concat([createPort(action.payload.y, action.payload.isInput, action.payload.width)]),
      };
    default:
      return state;
  }
}

// Action Creators
export function create(y, isInput = true, width = 0) {
  return {
    type: Types.CREATE,
    payload: {
      y: y,
      isInput: isInput,
      width: width,
    },
  };
}
