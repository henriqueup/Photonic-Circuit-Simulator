import React from "react";
import { Container } from "@inlet/react-pixi";
import {
  onDragStart as circuitComponentOnDragStart,
  onDragMove as circuitComponentOnDragMove,
  onDragEnd as circuitComponentOnDragEnd,
  CircuitComponent,
} from "../../models/CircuitComponent";
import { onDragStart as portOnDragStart, onDragMove as portOnDragMove, onDragEnd as portOnDragEnd, Port } from "../../models/Port";
import "./styles.css";

const Component = ({ circuitComponent }) => {
  return (
    <Container>
      <CircuitComponent
        key={circuitComponent.id}
        id={circuitComponent.id}
        image={circuitComponent.kind.image}
        x={circuitComponent.x}
        y={circuitComponent.y}
        interactive={circuitComponent.interactive}
        buttonMode={circuitComponent.buttonMode}
        pointerdown={circuitComponentOnDragStart}
        pointerup={circuitComponentOnDragEnd}
        pointerupoutside={circuitComponentOnDragEnd}
        pointermove={circuitComponentOnDragMove}
      >
        {circuitComponent.inputs.map((port) => (
          <Port
            key={port.id}
            id={port.id}
            image={port.image}
            x={port.x}
            y={port.y}
            interactive={port.interactive}
            buttonMode={port.buttonMode}
            pointerdown={portOnDragStart}
            pointerup={portOnDragEnd}
            pointerupoutside={portOnDragEnd}
            pointermove={portOnDragMove}
          />
        ))}
        {circuitComponent.outputs.map((port) => (
          <Port
            key={port.id}
            id={port.id}
            image={port.image}
            x={port.x}
            y={port.y}
            interactive={port.interactive}
            buttonMode={port.buttonMode}
            pointerdown={portOnDragStart}
            pointerup={portOnDragEnd}
            pointerupoutside={portOnDragEnd}
            pointermove={portOnDragMove}
          />
        ))}
      </CircuitComponent>
    </Container>
  );
};

export default Component;
