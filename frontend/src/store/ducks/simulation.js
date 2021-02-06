// Action Types
export const Types = {
  START: "simulation/START",
  END: "simulation/END",
  ADD_VALUES: "simulation/ADD_VALUES",
  MEASURE_VALUES: "simulation/MEASURE_VALUES",
  CREATE: "simulation/CREATE",
};

// Reducer
const INITIAL_STATE = {
  onGoing: false,
  instances: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.START:
      return {
        ...state,
        onGoing: true,
        instances: state.instances.map((instance) => {
          if (instance.circuitID === action.payload.currentCircuitID) {
            return {
              ...instance,
              measuredValues: [],
            };
          }
          return instance;
        }),
      };
    case Types.END:
      return {
        ...state,
        onGoing: false,
      };
    case Types.ADD_VALUES:
      return {
        ...state,
        instances: state.instances.map((instance) => {
          if (instance.circuitID === action.payload.currentCircuitID) {
            return {
              ...instance,
              measuredValues: instance.measuredValues.concat({
                time: action.payload.time,
                values: action.payload.values,
              }),
            };
          }
          return instance;
        }),
      };
    case Types.CREATE:
      return {
        ...state,
        instances: state.instances.concat([
          {
            circuitID: action.payload.circuitID,
            measuredValues: [],
          },
        ]),
      };
    default:
      return state;
  }
}

// Action Creators
export function startSimulation(currentCircuitID) {
  return {
    type: Types.START,
    payload: {
      currentCircuitID: currentCircuitID,
    },
  };
}

export function endSimulation() {
  return {
    type: Types.END,
    payload: {},
  };
}

export function addSimulationValues(time, values, currentCircuitID) {
  return {
    type: Types.ADD_VALUES,
    payload: {
      time: time,
      values: values,
      currentCircuitID: currentCircuitID,
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

export function createSimulation(circuitID) {
  return {
    type: Types.CREATE,
    payload: {
      circuitID: circuitID,
    },
  };
}
