import React from "react";
import SelectedComponent from "../selectedComponent";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { simulate } from "../../store/ducks/circuit";
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

const mapStateToProps = (state) => ({
  outputReaders: state.circuitComponent.instances.filter((instance) => instance.kind.kind === "output_reader"),
  ports: state.port.instances,
});

const mapDispatchToProps = (dispatch) => ({
  simulate: bindActionCreators(simulate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InspectionMenu);
