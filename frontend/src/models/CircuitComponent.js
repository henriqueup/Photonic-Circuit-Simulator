import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";
import { Sprite } from "pixi.js";
import componentPng from "../resources/images/component.png";
import { store } from "../store";
import { updatePos } from "../store/ducks/circuitComponent";
import { snapToGrid } from "../utils/componentBehaviour";

export function onDragStart(event) {
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

export function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;

  if (this.data) {
    const position = snapToGrid(this.data.getLocalPosition(this.parent));
    this.x = position.x - this.width / 2;
    this.y = position.y - this.height / 2;
    store.dispatch(updatePos(this.x, this.y));
  }

  // set the interaction data to null
  this.data = null;
}

export function onDragMove() {
  if (this.dragging) {
    if (this.data) {
      let newPosition = this.data.getLocalPosition(this.parent);

      this.x = newPosition.x - this.width / 2;
      this.y = newPosition.y - this.height / 2;
    }
  }
}

export const CircuitComponent = PixiComponent("CircuitComponent", {
  create() {
    return new Sprite.from(componentPng);
  },
  applyProps(instance, oldProps, newProps) {
    applyDefaultProps(instance, oldProps, newProps);
  },
});

const createCircuitComponent = (data) => {
  return {
    image: componentPng,
    x: Math.floor(Math.random() * 100) + 100,
    y: Math.floor(Math.random() * 100) + 100,
    interactive: true,
    buttonMode: true,
    id: data.id,
    inputs: data.inputs,
    outputs: data.outputs,
    kind: data.kind,
  };
};

export default createCircuitComponent;
