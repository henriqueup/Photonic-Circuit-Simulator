import React, { useMemo } from "react";
import { Chart } from "react-charts";
import "./styles.css";

const MeasuredOutputs = ({ outputs }) => {
  const data = outputs.map((output, i) => {
    return {
      label: `Output ${i + 1}`,
      data: [
        [0, output.power],
        [1, output.power],
      ],
    };
  });

  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );

  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom", hardMin: 0, show: false },
      { type: "linear", position: "left", hardMin: 0 },
    ],
    []
  );
  return (
    <div className="measuredOutputs">
      <span>Measured Outputs</span>
      <div
        style={{
          width: "250px",
          height: "200px",
        }}
      >
        <Chart data={data} axes={axes} series={series} />
      </div>
    </div>
  );
};

export default MeasuredOutputs;
