import { PORT_WIDTH } from "./Port";

const CONNECTION_PADDING = 4;

//returns hexadecimal color without #
export const generateColorFromID = (id) => {
  if (!id) return "";

  const base = parseInt("ffffff", 16);
  const firstValue = parseInt(id.substring(0, 6), 16);
  const secondValue = parseInt(id.substring(6, 12), 16);
  const thirdValue = parseInt(id.substring(12, 18), 16);
  const fourthValue = parseInt(id.substring(18), 16);

  let resultString = ((((((firstValue * secondValue) % base) * thirdValue) % base) * fourthValue) % base).toString(16);
  while (resultString.length < 6) {
    resultString = "0" + resultString;
  } // Zero pad.

  return "#" + resultString;
};

export const generateColorFromPower = (power) => {
  let color = "";

  switch (power) {
    case power < 10:
      color = "ff0000"
      break;
    case power < 20:
      color = "ff4400"
      break;
    case power < 30:
      color = "ff8800"
      break;
    case power < 40:
      color = "ffff00"
      break;
    case power < 50:
      color = "88ff00"
      break;
    case power < 60:
      color = "44ff00"
      break;
    case power >= 60:
      color = "00ff00"
      break;
    default:
      break;
  }

  return "#" + color;
}

const createConnection = (ports, points, originPortID) => {
  const targetX = points[2];
  const targetY = points[3];

  const targetPort = ports
    .filter((port) => port.isInput)
    .find((port) => {
      const xMin = port.worldX - CONNECTION_PADDING;
      const xMax = port.worldX + PORT_WIDTH + CONNECTION_PADDING;

      const yMin = port.worldY - CONNECTION_PADDING;
      const yMax = port.worldY + PORT_WIDTH + CONNECTION_PADDING;

      // console.log(`${xMin}, ${xMax}, ${yMin}, ${yMax}, ${targetX}, ${targetY}`)

      return targetX >= xMin && targetX <= xMax && targetY >= yMin && targetY <= yMax;
    });

  if (targetPort === undefined) {
    console.log("Invalid connection target");
    return null;
  }

  points[2] = targetPort.worldX + PORT_WIDTH / 2;
  points[3] = targetPort.worldY + PORT_WIDTH / 2;

  return {
    points: points,
    originPortID: originPortID,
    targetPortID: targetPort.id,
  };
};

export default createConnection;
