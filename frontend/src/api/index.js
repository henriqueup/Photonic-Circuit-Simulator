const baseURL = "http://localhost:5000";

async function healthCheck() {
  const response = await fetch(baseURL);
  const body = await response.json();
  return body.message;
}

async function postComponent() {
  let body = null;

  try {
    const response = await fetch(baseURL + "/data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kind: "swn",
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

export default { healthCheck, postComponent, getAllComponents };
