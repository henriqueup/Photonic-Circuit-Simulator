import { DEFAULT_LABEL } from "../models/Circuit";
import { baseURL } from "./index";

async function postCircuit() {
  let body = null;

  try {
    const response = await fetch(baseURL + "/circuits/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: DEFAULT_LABEL,
      }),
    });

    body = await response.json();
  } catch (error) {
    console.log(error);
  }
  return body;
}

async function deleteCircuit() {
  return await fetch(baseURL + "/circuits/", { method: "DELETE" });
}

async function saveCircuit() {
  let response = null;

  try {
    response = await fetch(baseURL + "/circuits/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: null,
    });
  } catch (error) {
    console.log(error);
  }
  return response;
}

export default { postCircuit, deleteCircuit, saveCircuit };
