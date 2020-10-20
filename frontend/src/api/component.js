import { baseURL } from "./index";

async function postComponent(kind) {
  let body = null;

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

    body = await response.json();
  } catch (err) {
    console.log(err);
  }
  return body;
}

async function getAllComponents() {
  const response = await fetch(baseURL + "/data");
  if (response.ok) {
    const body = await response.json();
    return body;
  } else {
    const text = await response.text();
    console.log(`API error: ${text}`);
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

    return response;
  } catch (err) {
    console.log(err);
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

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function calculateOutputs(id) {
  const response = await fetch(baseURL + `/data/${id}/calculate_outputs`);
  if (response.ok) {
    const body = await response.json();
    return body;
  } else {
    const text = await response.text();
    console.log(`API error: ${text}`);
  }
}

async function deleteComponent(id) {
  try {
    const response = await fetch(baseURL + `/data/${id}`, { method: "DELETE" });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export default { postComponent, getAllComponents, setOutputs, setPower, calculateOutputs, deleteComponent };
