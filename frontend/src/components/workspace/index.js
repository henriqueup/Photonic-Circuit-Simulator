import React, { useEffect, useState } from "react";
import { Stage, Container } from "@inlet/react-pixi";
import CircuitComponentModel from "../../models/CircuitComponent.js";
import CircuitComponent from "../circuitComponent";
import "./styles.css";

const Workspace = () => {
  const [components, setComponents] = useState([]);

  const initialize = () => {
    let initialComponents = [];
    initialComponents.push(new CircuitComponentModel());
    initialComponents.push(new CircuitComponentModel());

    setComponents(initialComponents);
  };

  useEffect(initialize, []);

  return (
    <Stage
      width={window.innerWidth - (window.innerWidth * 3) / 10}
      height={window.innerHeight - 22}
      options={{ antialias: true, backgroundColor: 0xffffff }}
    >
      <Container>
        {components.map((component, index) => (
          <CircuitComponent base={component} key={index} />
        ))}
      </Container>
    </Stage>
  );
};

export default Workspace;
