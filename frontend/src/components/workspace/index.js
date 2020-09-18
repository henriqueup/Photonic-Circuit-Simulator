import React, { useEffect, useState } from "react";
import { Stage, Sprite } from "@inlet/react-pixi";
import Component from "../../models/Component.js";
import "./styles.css";

const Workspace = () => {
  const [components, setComponents] = useState([]);

  const initialize = () => {
    setComponents([new Component()]);
  };

  useEffect(initialize, []);

  return (
    <Stage
      width={window.innerWidth - window.innerWidth / 5}
      height={window.innerHeight - 22}
      options={{ antialias: true, backgroundColor: 0xffffff }}
    >
      {components.map((component, index) => (
        <Sprite
          key={index}
          image={component.image}
          x={component.x}
          y={component.y}
          interactive={component.interactive}
          buttonMode={component.buttonMode}
          pointerdown={component.onDragStart}
          pointerup={component.onDragEnd}
          pointermove={component.onDragMove}
        />
      ))}
    </Stage>
  );
};

export default Workspace;
