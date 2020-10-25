import { DEFAULT_LABEL } from "../models/Circuit";
import { baseURL, validateResponse } from "./index";

async function postCircuit() {
  try {
    const response = await fetch(baseURL + "/circuits", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: DEFAULT_LABEL,
      }),
    });

    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function resetCircuits() {
  try {
    const response = await fetch(baseURL + "/circuits/reset", { method: "DELETE" });
    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function saveCircuit() {
  try {
    const response = await fetch(baseURL + "/circuits/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: null,
    });

    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function setCircuitLabel(label) {
  try {
    const response = await fetch(baseURL + "/circuits/set_label", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: label,
      }),
    });

    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function listCircuits() {
  try {
    const response = await fetch(baseURL + "/circuits", { method: "GET" });
    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function loadCircuit(id) {
  try {
    const response = await fetch(baseURL + `/circuits/${id}`, { method: "GET" });
    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

export default { postCircuit, resetCircuits, saveCircuit, setCircuitLabel, listCircuits, loadCircuit };
