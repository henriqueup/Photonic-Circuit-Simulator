import React, { useEffect } from "react";
import { Stage, Container } from "@inlet/react-pixi";
import CircuitComponent from "../circuitComponent";
import "./styles.css";
import Grid from "../grid";
import GenericLine from "../genericLine";
import { generateColorFromID } from "../../models/Connection";

const STAGE_WIDTH = (window.innerWidth * 7) / 10;
let STAGE_HEIGHT = (window.innerHeight * 65) / 100;

const Workspace = ({ circuitComponents, connections, heightOffset }) => {
  useEffect(() => {
    STAGE_HEIGHT -= heightOffset;
  }, [heightOffset]);

  return (
    <Stage
      width={STAGE_WIDTH}
      height={STAGE_HEIGHT}
      options={{ antialias: true, backgroundColor: 0xffffff }}
      style={{ width: "100%" }}
    >
      <Container>
        <Grid stageHeight={STAGE_HEIGHT} stageWidth={STAGE_WIDTH} />
        {circuitComponents.map((component) => (
          <CircuitComponent circuitComponent={component} key={component.id} />
        ))}
        {connections.map((connection) => (
          <GenericLine
            key={connection.originPortID}
            points={connection.points}
            lineWidth={2}
            lineColor={generateColorFromID(connection.originPortID)}
          />
        ))}
      </Container>
    </Stage>
  );
};

export default Workspace;
