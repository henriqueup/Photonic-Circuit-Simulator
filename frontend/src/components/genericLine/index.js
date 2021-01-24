import Line from "../../models/Line";
import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";

const GenericLine = PixiComponent("GenericLine", {
  create() {
    return new Line([]);
  },
  applyProps(instance, oldProps, newProps) {
    applyDefaultProps(instance, oldProps, newProps);
    instance.clear();

    const color = parseInt(newProps.lineColor.substring(1), 16);
    instance.lineStyle(newProps.lineWidth, color, newProps.lineAlpha);

    const points = newProps.points;
    this.moveTo(points[0], points[1]);
    this.lineTo(points[2], points[3]);
  },
});

export default GenericLine;
