import React, { useEffect, useState } from "react";
import { Container, Sprite } from "@inlet/react-pixi";
import "./styles.css";

const Component = (props) => {
  const initialize = () => {};

  useEffect(initialize, []);

  return (
    <Container>
      <Sprite
        image={props.base.image}
        x={props.base.x}
        y={props.base.y}
        interactive={props.base.interactive}
        buttonMode={props.base.buttonMode}
        pointerdown={props.base.onDragStart}
        pointerup={props.base.onDragEnd}
        pointerupoutside={props.base.onDragEnd}
        pointermove={props.base.onDragMove}
      >
        {props.base.ports.map((port, index) => (
          <Sprite
            key={index}
            image={port.image}
            x={port.x}
            y={port.y}
            interactive={port.interactive}
            buttonMode={port.buttonMode}
            pointerdown={port.onDragStart}
            pointerup={port.onDragEnd}
            pointerupoutside={port.onDragEnd}
            pointermove={port.onDragMove}
          />
        ))}
      </Sprite>
    </Container>
  );
};

export default Component;
