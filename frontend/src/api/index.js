import circuitApi from "./circuit";
import componentApi from "./component";

export const baseURL = "http://localhost:5000";

export async function validateResponse(response) {
  if (response.ok) {
    let body = {};
    try {
      body = await response.json();
    } catch (error) {
      if (!/SyntaxError: JSON.parse/i.test(error)) {
        throw error;
      }
    }
    return {
      body: body,
      ok: true,
    };
  } else {
    const text = await response.text();
    console.log(`API error: ${text}`);
  }
}

async function healthCheck() {
  const response = await fetch(baseURL);
  const body = await response.json();
  return body.message;
}

export default { healthCheck, ...componentApi, ...circuitApi };
