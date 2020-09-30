import componentPng from "../resources/images/component.png";
import Line from "./Line";
import Port from "./Port";

const GRID_SIZE = 18;
const CIRCUIT_COMPONENT_WIDTH = 80;

const snapToGrid = (position) => {
  let x = Math.ceil(position.x);
  let y = Math.ceil(position.y);

  let remainderX = x % GRID_SIZE;
  let remainderY = y % GRID_SIZE;

  position.x = x - remainderX;
  position.y = y - remainderY;

  return position;
};

export default class CircuitComponent {
  constructor() {
    this.image = componentPng;
    this.x = Math.floor(Math.random() * 100) + 100;
    this.y = Math.floor(Math.random() * 100) + 100;
    this.interactive = true;
    this.buttonMode = true;

    this.ports = [];
    this.ports.push(new Port(8));
    this.ports.push(new Port(8, false, CIRCUIT_COMPONENT_WIDTH));
  }

  onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;

    if (this.data) {
      const position = snapToGrid(this.data.getLocalPosition(this.parent));
      this.x = position.x - this.width / 2;
      this.y = position.y - this.height / 2;
    }

    // let line = new Line([0, 0, this.x, this.y], 2);
    // this.parent.addChild(line);

    // set the interaction data to null
    this.data = null;
  }

  onDragMove() {
    if (this.dragging) {
      if (this.data) {
        let newPosition = this.data.getLocalPosition(this.parent);

        this.x = newPosition.x - this.width / 2;
        this.y = newPosition.y - this.height / 2;
      }
    }
  }
}
