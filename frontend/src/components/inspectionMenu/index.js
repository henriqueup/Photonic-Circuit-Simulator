import React from "react";
import SelectedComponent from "../selectedComponent";
import "./styles.css";
import MeasuredOutputs from "../measuredOutputs";

const InspectionMenu = ({ simulate, outputReaders, ports }) => {
  const outputs = ports.filter(
    (port) =>
      outputReaders
        .map((reader) => reader.inputs)
        .flat()
        .indexOf(port.id) !== -1
  );

  return (
    <div className="inspectionMenu">
      <span className="inspectionMenuTitle">Inspection Menu</span>
      <SelectedComponent />
      <button className="simulateButton" onClick={simulate}>
        Simulate
      </button>
      {outputs.length ? <MeasuredOutputs outputs={outputs} /> : null}
    </div>
  );
};

export default InspectionMenu;
