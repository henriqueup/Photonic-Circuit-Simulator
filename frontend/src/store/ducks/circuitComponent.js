import CircuitComponent from "../../models/CircuitComponent";

// Action Types
export const Types = {
  CREATE: 'auth/CREATE',
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
        circuitComponents = circuitComponents.push(new CircuitComponent())
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
  }
}