// Action Types
export const Types = {
  START: "simulation/START",
  END: "simulation/END",
  ADD_VALUES: "simulation/ADD_VALUES",
  MEASURE_VALUES: "simulation/MEASURE_VALUES",
};

// Reducer
const INITIAL_STATE = {
  onGoing: false,
  measuredValues: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.START:
      return {
        ...state,
        onGoing: true,
        measuredValues: [],
      };
    case Types.END:
      return {
        ...state,
        onGoing: false,
      };
    case Types.ADD_VALUES:
      return {
        ...state,
        measuredValues: state.measuredValues.concat({
          time: action.payload.time,
          values: action.payload.values,
        }),
      };
    default:
      return state;
  }
}

// Action Creators
export function startSimulation() {
  return {
    type: Types.START,
    payload: {},
  };
}

export function endSimulation() {
  return {
    type: Types.END,
    payload: {},
  };
}

export function addSimulationValues(time, values) {
  return {
    type: Types.ADD_VALUES,
    payload: {
      time: time,
      values: values,
    },
  };
}

export function measureSimulationValues(time) {
  return {
    type: Types.MEASURE_VALUES,
    payload: {
      time: time,
    },
  };
}
