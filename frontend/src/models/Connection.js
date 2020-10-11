import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";
import Line from "./Line";
import { PORT_WIDTH } from "./Port";

const CONNECTION_PADDING = 4;

export const Connection = PixiComponent("Connection", {
  create() {
    return new Line([]);
  },
  applyProps(instance, oldProps, newProps) {
    instance.updatePoints(newProps.points);
    applyDefaultProps(instance, oldProps, newProps);
  },
});

const createConnection = (ports, points, originPortID) => {
  const targetX = points[2];
  const targetY = points[3];

  const targetPort = ports.filter(port => port.isInput).find(port => {
    const xMin = port.worldX - CONNECTION_PADDING;
    const xMax = port.worldX + PORT_WIDTH + CONNECTION_PADDING;

    const yMin = port.worldY - CONNECTION_PADDING;
    const yMax = port.worldY + PORT_WIDTH + CONNECTION_PADDING;

    // console.log(`${xMin}, ${xMax}, ${yMin}, ${yMax}, ${targetX}, ${targetY}`)

    return targetX >= xMin && targetX <= xMax && targetY >= yMin && targetY <= yMax;
  })

  if (targetPort === undefined){
    console.log("Invalid connection target");
    return [];
  }

  points[2] = targetPort.worldX + PORT_WIDTH/2;
  points[3] = targetPort.worldY + PORT_WIDTH/2;

  return [{
    points: points,
    originPortID: originPortID,
    targetPortID: targetPort.id
  }];
};

export default createConnection;