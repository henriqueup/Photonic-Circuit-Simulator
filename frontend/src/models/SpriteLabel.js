import { applyDefaultProps, PixiComponent } from "@inlet/react-pixi";
import { Text } from "pixi.js";
import { componentSizes } from "../utils/componentBehaviour";

export const SpriteLabel = PixiComponent("SpriteLabel", {
  create() {
    return new Text();
  },
  applyProps(instance, oldProps, newProps) {
    if (newProps.style.align === "center") {
      const fontSize = newProps.style.fontSize;
      const textLength = newProps.text.length;

      instance.x = componentSizes[newProps.kind].width / 2 - textLength * (fontSize / 4);
      instance.y = componentSizes[newProps.kind].height / 2 - (fontSize * 4) / 7;
    }

    applyDefaultProps(instance, oldProps, newProps);
  },
});
