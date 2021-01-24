import React from "react";
import { Line } from "react-chartjs-2";
import { generateColorFromID } from "../../models/Connection";
import "./styles.css";

const MeasuredOutputs = ({ outputs }) => {
  const labels = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
  const baseDataset = {
    fill: false,
    pointBorderWidth: 1,
    pointHoverRadius: 1,
    pointRadius: 1,
    pointHitRadius: 10,
  };

  const data = {
    labels: labels,
    datasets: outputs.map((output, i) => {
      return {
        ...baseDataset,
        backgroundColor: generateColorFromID(output.target),
        pointBackgroundColor: generateColorFromID(output.target),
        borderColor: generateColorFromID(output.target),
        label: `Reader ${i + 1}`,
        data: labels.map((_) => output.power),
      };
    }),
  };

  const legendOpts = {
    display: false,
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 70,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="measuredOutputs">
      <span>Measured Outputs</span>
      <Line data={data} legend={legendOpts} options={options} />
    </div>
  );
};

export default MeasuredOutputs;
