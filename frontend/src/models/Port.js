import portPng from "../resources/images/port.png";
import Line from "./Line";

const PORT_WIDTH = 18;

export default class Port {
  constructor(y, isInput = true, width = 0) {
    this.image = portPng;
    this.interactive = true;
    this.buttonMode = true;

    this.x = isInput ? 0 : width - PORT_WIDTH;
    this.y = y;
    this.mouseX = 0;
    this.mouseY = 0;
  }

  onDragStart(event) {
    event.stopPropagation();
    // this.data = event.data;
    // this.alpha = 0.5;
    // this.dragging = true;
    this.connecting = true;
    this.mouseX = 0;
    this.mouseY = 0;
    this.initialMouseX = 0;
    this.initialMouseY = 0;

    this.updateMouse = (e) => {
      if (!this.mouseX) {
        this.initialMouseX = e.clientX;
      }
      if (!this.mouseY) {
        this.initialMouseY = e.clientY;
      }

      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    };

    window.addEventListener("mousemove", this.updateMouse);
  }

  onDragEnd(event) {
    // if (this.dragging) {
    //   event.stopPropagation();
    //   this.alpha = 1;
    //   this.dragging = false;
    //   // set the interaction data to null
    //   this.data = null;
    // }
    if (this.connecting) {
      event.stopPropagation();
      this.connecting = false;
    }

    let linePos = [
      PORT_WIDTH / 2,
      PORT_WIDTH / 2,
      this.mouseX - this.initialMouseX + PORT_WIDTH / 2,
      this.mouseY - this.initialMouseY + PORT_WIDTH / 2,
    ];
    console.log(linePos);
    console.log(this.worldTransform);
    let line = new Line(linePos, 2);
    this.addChild(line);
    window.removeEventListener("mousemove", this.updateMouse);
  }

  onDragMove(event) {
    if (this.dragging) {
      event.stopPropagation();
      if (this.data) {
        let newPosition = this.data.getLocalPosition(this.parent);

        if (newPosition.y >= 0 + this.height / 2 && newPosition.y <= this.parent.height - this.height / 2) {
          this.y = newPosition.y - this.height / 2;
        }
      }
    }
  }
}
