export const DEFAULT_LABEL = "New Circuit";

const createCircuit = (id, label) => {
  return {
    id: id,
    label: label,
    components: [],
    isSaved: false,
  };
};

export default createCircuit;
