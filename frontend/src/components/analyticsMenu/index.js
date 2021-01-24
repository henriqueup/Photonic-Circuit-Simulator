import React from "react";
import MeasuredOutputs from "../measuredOutputs";
import "./styles.css";

const AnalyticsMenu = ({ outputReaders, ports }) => {
  const outputs = ports.filter(
    (port) =>
      outputReaders
        .map((reader) => reader.inputs)
        .flat()
        .indexOf(port.id) !== -1
  );

  return outputs.length ? (
    <div className="analyticsMenu">
      <MeasuredOutputs outputs={outputs} />
    </div>
  ) : null;
};

export default AnalyticsMenu;
