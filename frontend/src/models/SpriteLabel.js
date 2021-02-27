import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";
import { Text } from "pixi.js";
import { componentSizes } from "../utils/componentBehaviour";

const startMoveDelay = (component) => {
  setTimeout(() => {
    if (component.dragging) {
      component.movable = true;
    }
  }, 50);
};

export function onDragStart(event) {
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
  this.moved = false;

  startMoveDelay(this);
}

export function onDragEnd(label) {
  label.alpha = 1;
  label.dragging = false;
  label.movable = false;

  let x = label.x;
  let y = label.y;
  if (label.data && label.moved) {
    const position = label.data.getLocalPosition(label.parent);
    x = position.x - label.width / 2;
    y = position.y - label.height / 2;
  }

  label.moved = false;
  label.data = null;

  return {
    x: x,
    y: y,
  };
}

export function onDragMove() {
  if (this.movable) {
    if (this.data) {
      let newPosition = this.data.getLocalPosition(this.parent);

      this.x = newPosition.x - this.width / 2;
      this.y = newPosition.y - this.height / 2;

      this.moved = true;
    }
  }
}

export const SpriteLabel = PixiComponent("SpriteLabel", {
  create() {
    return new Text();
  },
  applyProps(instance, oldProps, newProps) {
    const fontSize = newProps?.style?.fontSize;
    const textLength = newProps?.text?.length;
    instance.zIndex = 88888;

    let parentX = 0;
    let parentY = 0;
    if (newProps.componentRef) {
      parentX += newProps.componentRef.current?.transform.worldTransform.tx;
      parentY += newProps.componentRef.current?.transform.worldTransform.ty;
    }

    if (newProps.relativePosition == null) {
      switch (newProps.style.align) {
        case "center":
          instance.x =
            parentX +
            componentSizes[newProps.kind].width / 2 -
            textLength * (fontSize / 4);
          instance.y =
            parentY +
            componentSizes[newProps.kind].height / 2 -
            (fontSize * 4) / 7;
          break;
        case "top-right":
          instance.x =
            parentX +
            componentSizes[newProps.kind].width -
            textLength * (fontSize / 4);
          instance.y = parentY - (fontSize + 1);
          break;
        default:
          break;
      }
    } else {
      instance.x = parentX + newProps.relativePosition.x;
      instance.y = parentY + newProps.relativePosition.y;
    }

    applyDefaultProps(instance, oldProps, newProps);
  },
});
