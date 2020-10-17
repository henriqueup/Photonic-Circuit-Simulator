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
import { store } from "../../store";
import { SpriteLabel } from "../../models/SpriteLabel";

const Component = ({ circuitComponent }) => {
  return circuitComponent.confirmedCreation ? (
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
        {circuitComponent.inputs.map((portID) => {
          const port = store.getState().port.instances.find((port) => port.id === portID);

          return (
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
          );
        })}
        {circuitComponent.outputs.map((portID) => {
          const port = store.getState().port.instances.find((port) => port.id === portID);

          return (
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
          );
        })}
        {circuitComponent.kind.kind === "output_reader" ? (
          <SpriteLabel
            kind={"output_reader"}
            text={store
              .getState()
              .port.instances.find((port) => port.id === circuitComponent.inputs[0])
              .power.toFixed(2)}
            style={{
              fontSize: 14,
              align: "center",
            }}
          />
        ) : null}
      </CircuitComponent>
    </Container>
  ) : null;
};

export default Component;
