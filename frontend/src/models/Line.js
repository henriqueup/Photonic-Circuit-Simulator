import { Graphics } from "pixi.js";

export default class Line extends Graphics {
  constructor(points, lineSize, lineColor, lineAlpha) {
    super();

    let s = (this.lineWidth = lineSize || 1);
    let c = (this.lineColor = lineColor || "0x000000");
    let a = (this.lineAlpha = lineAlpha || 1);

    this.points = points;

    this.lineStyle(s, c, a);
    console.log(this.lineWidth);

    this.moveTo(points[0], points[1]);
    this.lineTo(points[2], points[3]);
  }

  updatePoints(p) {
    let points = (this.points = p.map((val, index) => val || this.points[index]));

    let s = this.lineWidth;
    let c = this.lineColor;
    let a = this.lineAlpha;

    this.clear();
    this.lineStyle(s, c, a);
    this.moveTo(points[0], points[1]);
    this.lineTo(points[2], points[3]);
  }
}
