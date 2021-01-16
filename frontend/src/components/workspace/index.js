import React, { useEffect } from "react";
import { Stage, Container } from "@inlet/react-pixi";
import CircuitComponent from "../circuitComponent";
import "./styles.css";
import { Connection } from "../../models/Connection";
import Grid from "../grid";

const STAGE_WIDTH = window.innerWidth - (window.innerWidth * 3) / 10;
let STAGE_HEIGHT = window.innerHeight;

const Workspace = ({ circuitComponents, connections, heightOffset }) => {
  useEffect(() => {
    STAGE_HEIGHT -= heightOffset;
  }, [heightOffset]);

  return (
    <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT} options={{ antialias: true, backgroundColor: 0xffffff }}>
      <Container>
        <Grid stageHeight={STAGE_HEIGHT} stageWidth={STAGE_WIDTH} />
        {circuitComponents.map((component) => (
          <CircuitComponent circuitComponent={component} key={component.id} />
        ))}
        {connections.map((connection, i) => (
          <Connection points={connection.points} key={i} />
        ))}
      </Container>
    </Stage>
  );
};

export default Workspace;
