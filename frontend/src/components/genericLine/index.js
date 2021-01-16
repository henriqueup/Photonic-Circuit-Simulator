import Line from "../../models/Line";
import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";

const GenericLine = PixiComponent("GenericLine", {
  create() {
    return new Line([]);
  },
  applyProps(instance, oldProps, newProps) {
    applyDefaultProps(instance, oldProps, newProps);
    instance.clear();

    instance.lineStyle(newProps.lineWidth, newProps.lineColor, newProps.lineAlpha);

    const points = newProps.points;
    instance.moveTo(points[0], points[1]);
    instance.lineTo(points[2], points[3]);
  },
});

export default GenericLine;
