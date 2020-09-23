import componentPng from "../resources/images/component.png";

const GRID_SIZE = 18;

const snapToGrid = (position) => {
  let x = Math.ceil(position.x);
  let y = Math.ceil(position.y);

  let remainderX = x % GRID_SIZE;
  let remainderY = y % GRID_SIZE;

  position.x = x - remainderX;
  position.y = y - remainderY;

  return position;
};

export default class Component {
  constructor() {
    this.image = componentPng;
    this.x = Math.floor(Math.random() * 100) + 100;
    this.y = Math.floor(Math.random() * 100) + 100;
    this.interactive = true;
    this.buttonMode = true;
  }

  onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    const position = snapToGrid(this.data.getLocalPosition(this.parent));
    this.x = position.x - this.width / 2;
    this.y = position.y - this.height / 2;

    // set the interaction data to null
    this.data = null;
  }

  onDragMove() {
    if (this.dragging) {
      let newPosition = this.data.getLocalPosition(this.parent);

      this.x = newPosition.x - this.width / 2;
      this.y = newPosition.y - this.height / 2;
    }
  }
}
