import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";
import { Sprite } from "pixi.js";
import portPng from "../resources/images/port.png";
import { componentSizes } from "../utils/componentBehaviour";
import Line from "./Line";

export const PORT_WIDTH = 18;

export function onDragStart(event) {
  event.stopPropagation();
  // this.data = event.data;
  // this.alpha = 0.5;
  // this.dragging = true;
  this.connecting = true;
  this.mouseX = 0;
  this.mouseY = 0;
  this.initialMouseX = 0;
  this.initialMouseY = 0;
  console.log(this);

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

export function onDragEnd(event) {
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

  let line = new Line(linePos, 2);
  this.addChild(line);
  window.removeEventListener("mousemove", this.updateMouse);
}

export function onDragMove(event) {
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

export const Port = PixiComponent("Port", {
  create() {
    return new Sprite.from(portPng);
  },
  applyProps(instance, oldProps, newProps) {
    console.log("applying props");
    applyDefaultProps(instance, oldProps, newProps);
  },
});

const createPort = (y, data, kind, isInput = true) => {
  let x = isInput ? 0 : componentSizes[kind] - PORT_WIDTH;

  return {
    image: portPng,
    interactive: true,
    buttonMode: true,
    isDragging: false,
    x: x,
    y: y,
    isInput: isInput,
    id: data.id,
    power: data.power,
    target: data.target,
  };
};

export default createPort;
