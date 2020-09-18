import componentPng from "../resources/images/component.png";

export default class Component {
  constructor() {
    this.image = componentPng;
    this.x = 100;
    this.y = 100;
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
    // set the interaction data to null
    this.data = null;
  }

  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x - this.width / 2;
      this.y = newPosition.y - this.height / 2;
    }
  }
}
