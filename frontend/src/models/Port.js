import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";
import { Sprite } from "pixi.js";
import portPng from "../resources/images/port.png";
import { store } from "../store";
import { attemptCreation as attemptConnectionCreation } from "../store/ducks/connection";
import { componentSizes } from "../utils/componentBehaviour";
import { STARTING_X, STARTING_Y } from "./CircuitComponent";

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

    let points = [
      this.transform.worldTransform.tx + PORT_WIDTH / 2,
      this.transform.worldTransform.ty + PORT_WIDTH / 2,
      this.transform.localTransform.tx + this.mouseX - this.initialMouseX + this.parent.transform.worldTransform.tx + PORT_WIDTH / 2,
      this.transform.localTransform.ty + this.mouseY - this.initialMouseY + this.parent.transform.worldTransform.ty + PORT_WIDTH / 2,
    ];

    store.dispatch(attemptConnectionCreation(points, this.id));
  }

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
    applyDefaultProps(instance, oldProps, newProps);
  },
});

const createPorts = (ports, parentID, parentKind, isInput = true, parentX = STARTING_X, parentY = STARTING_Y) => {
  if (!ports || !ports.length) {
    return [];
  }

  let createdPorts = [];
  const parentDimension = componentSizes[parentKind].height;

  const x = isInput ? 0 : parentDimension - PORT_WIDTH;

  const increment = parentDimension / ports.length;
  const currentY = parentKind === "output_reader" ? 1 : 8;

  ports.forEach((port, i) => {
    const y = currentY + increment * i;

    createdPorts.push({
      image: portPng,
      interactive: true,
      buttonMode: true,
      isDragging: false,
      x: x,
      y: y,
      worldX: parentX + x,
      worldY: parentY + y,
      isInput: isInput,
      id: port.id,
      parentID: parentID,
      power: port.power,
      target: port.target,
    });
  });
  return createdPorts;
};

export default createPorts;
