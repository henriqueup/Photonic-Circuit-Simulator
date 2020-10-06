import circuitApi from "./circuit";
import componentApi from "./component";

export const baseURL = "http://localhost:5000";

async function healthCheck() {
  const response = await fetch(baseURL);
  const body = await response.json();
  return body.message;
}

export default { healthCheck, ...componentApi, ...circuitApi };
