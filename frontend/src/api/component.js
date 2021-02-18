import { baseURL, validateResponse } from "./index";

async function postComponent(kind) {
  try {
    const response = await fetch(baseURL + "/data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kind: kind,
      }),
    });

    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function getAllComponents() {
  try {
    const response = await fetch(baseURL + "/data");
    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function setOutputs(componentID, originPortID, targetPortID) {
  try {
    const response = await fetch(baseURL + `/data/${componentID}/set_outputs`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        outputs: [
          {
            id: originPortID,
            target: targetPortID,
          },
        ],
      }),
    });

    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function setPower(componentID, power) {
  try {
    const response = await fetch(baseURL + `/data/${componentID}/set_power`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        power: power,
      }),
    });

    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function calculateOutputs(id) {
  try {
    const response = await fetch(baseURL + `/data/${id}/calculate_outputs`);
    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function deleteComponent(id) {
  try {
    const response = await fetch(baseURL + `/data/${id}`, { method: "DELETE" });
    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function setPosition(componentID, x, y) {
  try {
    const response = await fetch(
      baseURL + `/data/${componentID}/set_position`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x: x,
          y: y,
        }),
      }
    );

    return validateResponse(response);
  } catch (error) {
    console.log(error);
  }
}

async function setLabel(componentID, label) {
  try {
    const response = await fetch(baseURL + `/data/${componentID}/set_label`, {
      method: "PUT",
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

export default {
  postComponent,
  getAllComponents,
  setOutputs,
  setPower,
  calculateOutputs,
  deleteComponent,
  setPosition,
  setLabel,
};
