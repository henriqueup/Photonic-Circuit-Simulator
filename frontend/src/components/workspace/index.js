import React from "react";
import { Stage, Container } from "@inlet/react-pixi";
import { connect } from "react-redux";
import CircuitComponent from "../circuitComponent";
import "./styles.css";
import { Connection } from "../../models/Connection";

const STAGE_WIDTH = window.innerWidth - (window.innerWidth * 3) / 10;

const Workspace = ({ circuitComponents, connections, heightOffset }) => {
  return (
    <Stage width={STAGE_WIDTH} height={window.innerHeight - heightOffset - 200} options={{ antialias: true, backgroundColor: 0xffffff }}>
      <Container>
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

const mapStateToProps = (state) => ({
  circuitComponents: state.circuitComponent.instances,
  connections: state.connection.instances,
});

export default connect(mapStateToProps, null)(Workspace);
