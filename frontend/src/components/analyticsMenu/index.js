import React, { useEffect, useState } from "react";
import MeasuredOutputs from "../measuredOutputs";
import { connect } from "react-redux";
import "./styles.css";

const AnalyticsMenu = ({
  analyticsHeight,
  simulations,
  currentCircuitID,
  handleChangeAnalyticsHeight,
}) => {
  const [currentSimulation, setCurrentSimulation] = useState(undefined);

  useEffect(() => {
    const aux = simulations.find(
      (simulation) => simulation.circuitID === currentCircuitID
    );

    setCurrentSimulation(aux);
    if (aux?.measuredValues?.length) {
      handleChangeAnalyticsHeight(analyticsHeight);
    } else {
      handleChangeAnalyticsHeight(0);
    }
  }, [
    analyticsHeight,
    simulations,
    currentCircuitID,
    handleChangeAnalyticsHeight,
  ]);

  return currentSimulation?.measuredValues?.length ? (
    <div className="analyticsMenu" style={{ height: analyticsHeight }}>
      <div className="analyticsMenuTitle">
        <span>Analytics</span>
      </div>
      <MeasuredOutputs currentSimulation={currentSimulation} />
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  currentCircuitID: state.circuit.current,
  simulations: state.simulation.instances,
});

export default connect(mapStateToProps, null)(AnalyticsMenu);
