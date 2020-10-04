import React from "react";
import { Stage, Container } from "@inlet/react-pixi";
import { connect } from "react-redux";
import CircuitComponent from "../circuitComponent";
import "./styles.css";

const STAGE_WIDTH = window.innerWidth - (window.innerWidth * 3) / 10;

const Workspace = ({ circuitComponents }) => {
  return (
    <Stage width={STAGE_WIDTH} height={window.innerHeight - 22} options={{ antialias: true, backgroundColor: 0xffffff }}>
      <Container>
        {circuitComponents.map((component, index) => (
          <CircuitComponent circuitComponent={component} key={index} />
        ))}
      </Container>
    </Stage>
  );
};

const mapStateToProps = (state) => ({
  circuitComponents: state.circuitComponent.instances,
});

export default connect(mapStateToProps, null)(Workspace);
