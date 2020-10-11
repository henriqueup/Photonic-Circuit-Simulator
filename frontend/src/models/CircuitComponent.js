import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";
import { Sprite, Texture } from "pixi.js";
import { store } from "../store";
import { select, updatePos } from "../store/ducks/circuitComponent";
import { basicKinds, snapToGrid } from "../utils/componentBehaviour";

export const STARTING_X = 100;
export const STARTING_Y = 100;

export function onDragStart(event) {
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
  store.dispatch(select(this.id));
  console.log(this);
}

export function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;

  if (this.data) {
    const position = snapToGrid(this.data.getLocalPosition(this.parent));
    this.x = position.x - this.width / 2;
    this.y = position.y - this.height / 2;
    store.dispatch(updatePos(this.id, this.x, this.y));
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
    return new Sprite();
  },
  applyProps(instance, oldProps, newProps) {
    instance.texture = Texture.from(newProps.image);
    applyDefaultProps(instance, oldProps, newProps);
  },
});

const createCircuitComponent = (data) => {
  return {
    x: STARTING_X,
    y: STARTING_Y,
    interactive: true,
    buttonMode: true,
    id: data.id,
    inputs: data.inputs,
    outputs: data.outputs,
    kind: basicKinds.find((component) => component.kind === data.kind),
  };
};

export default createCircuitComponent;
