import { PORT_WIDTH } from "./Port";

const CONNECTION_PADDING = 4;

//returns hexadecimal color without #
export const generateColorFromID = (id) => {
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
