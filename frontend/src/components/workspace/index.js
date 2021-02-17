import React, { useEffect } from "react";
import { Stage, Container } from "@inlet/react-pixi";
import CircuitComponent from "../circuitComponent";
import "./styles.css";
import Grid from "../grid";
import GenericLine from "../genericLine";
import { generateColorFromID } from "../../models/Connection";

const STAGE_WIDTH = (window.innerWidth * 7) / 10;

const Workspace = ({
  circuitComponents,
  connections,
  workspaceHeight,
  handleChangeHeightOffset,
}) => {
  useEffect(() => {
    const stageElement = document.getElementById("workspace");
    handleChangeHeightOffset(stageElement.getBoundingClientRect().top);
  }, [handleChangeHeightOffset]);

  return (
    <Stage
      id="workspace"
      width={STAGE_WIDTH}
      height={workspaceHeight}
      options={{ antialias: true, backgroundColor: 0xffffff }}
      style={{ width: "100%" }}
    >
      <Container>
        <Grid stageHeight={workspaceHeight} stageWidth={STAGE_WIDTH} />
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
