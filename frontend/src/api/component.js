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
  const body = await response.json();
  return body;
}

export default { postComponent, getAllComponents };
