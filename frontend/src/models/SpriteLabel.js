import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";
import { Text } from "pixi.js";
import { componentSizes } from "../utils/componentBehaviour";

export const SpriteLabel = PixiComponent("SpriteLabel", {
  create() {
    return new Text();
  },
  applyProps(instance, oldProps, newProps) {
    const fontSize = newProps?.style?.fontSize;
    const textLength = newProps?.text?.length;

    switch (newProps.style.align) {
      case "center":
        instance.x = componentSizes[newProps.kind].width / 2 - textLength * (fontSize / 4);
        instance.y = componentSizes[newProps.kind].height / 2 - (fontSize * 4) / 7;
        break;
      case "top-right":
        instance.x = componentSizes[newProps.kind].width - textLength * (fontSize / 4);
        instance.y = 0 - (fontSize + 1);
        break;
      default:
        break;
    }

    applyDefaultProps(instance, oldProps, newProps);
  },
});
