import React, { useEffect, useState } from "react";
import { Stage, Container } from "@inlet/react-pixi";
import { connect } from "react-redux";
import CircuitComponentModel from "../../models/CircuitComponent.js";
import CircuitComponent from "../circuitComponent";
import "./styles.css";

const Workspace = ({ circuitComponents }) => {
  return (
    <Stage
      width={window.innerWidth - (window.innerWidth * 3) / 10}
      height={window.innerHeight - 22}
      options={{ antialias: true, backgroundColor: 0xffffff }}
    >
      <Container>
        {circuitComponents.map((component, index) => (
          <CircuitComponent circuitComponent={component} key={index} />
        ))}
      </Container>
    </Stage>
  );
};

const mapStateToProps = (state) => ({
  circuitComponents: state.circuitComponent.circuitComponents,
});

export default connect(mapStateToProps, null)(Workspace);
