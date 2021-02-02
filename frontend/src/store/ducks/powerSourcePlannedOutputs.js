// Action Types
export const Types = {
  SAVE: "powerSourcePlannedOutputs/SAVE",
};

// Reducer
const INITIAL_STATE = {
  instances: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SAVE:
      return {
        ...state,
        instances: state.instances.find(
          (instance) => instance.id === action.payload.powerSourceID
        )
          ? state.instances.map((instance) => {
              if (instance.id === action.payload.powerSourceID) {
                return {
                  ...instance,
                  plannedOutputs: action.payload.plannedOutputs,
                };
              }
              return instance;
            })
          : state.instances.concat({
              id: action.payload.powerSourceID,
              plannedOutputs: action.payload.plannedOutputs,
            }),
      };
    default:
      return state;
  }
}

// Action Creators
export function savePlannedOutputs(powerSourceID, plannedOutputs) {
  return {
    type: Types.SAVE,
    payload: {
      powerSourceID: powerSourceID,
      plannedOutputs: plannedOutputs,
    },
  };
}
