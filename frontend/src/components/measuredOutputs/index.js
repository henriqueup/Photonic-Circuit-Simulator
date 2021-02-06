import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { generateColorFromID } from "../../models/Connection";
import { connect } from "react-redux";
import "./styles.css";

const delay = 0.2;

const MeasuredOutputs = ({ outputs, currentCircuitID, simulations }) => {
  const [times, setTimes] = useState([]);
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    const currentSimulation = simulations.find(
      (simulation) => simulation.circuitID === currentCircuitID
    );

    if (currentSimulation) {
      let timesAux = currentSimulation.measuredValues.map((item) => item.time);
      const lastTime =
        timesAux.length > 1
          ? timesAux[timesAux.length - 1] +
            timesAux[timesAux.length - 1] -
            timesAux[timesAux.length - 2]
          : 5;

      timesAux = timesAux.reduce((acc, curr, i) => {
        if (i !== 0) acc = acc.concat([curr, curr + delay]);
        else acc = [timesAux[i]];
        return acc;
      }, []);

      timesAux.push(lastTime);

      setTimes(timesAux);

      if (currentSimulation.measuredValues?.length) {
        let portsAux = [];
        currentSimulation.measuredValues[0].values.forEach((value) => {
          portsAux.push({
            id: value.id,
            powers: [],
          });
        });

        currentSimulation.measuredValues.forEach((item) => {
          item.values.forEach((value, i) =>
            portsAux
              .find((port) => port.id === value.id)
              .powers.push(value.power)
          );
        });

        portsAux.forEach((aux) => {
          aux.powers = aux.powers.reduce((acc, curr, i) => {
            if (i !== aux.powers.length - 1) acc = acc.concat([curr, curr]);
            else acc = acc.concat([curr]);
            return acc;
          }, []);

          aux.powers.push(aux.powers[aux.powers.length - 1]);
        });

        setPorts(portsAux);
      }
    }
  }, [currentCircuitID, simulations]);

  const baseDataset = {
    fill: false,
    pointBorderWidth: 1,
    pointHoverRadius: 1,
    pointRadius: 1,
    pointHitRadius: 10,
  };

  const data = {
    datasets: ports.map((port, i) => {
      console.log(port.powers);
      return {
        ...baseDataset,
        backgroundColor: generateColorFromID(port.id),
        pointBackgroundColor: generateColorFromID(port.id),
        borderColor: generateColorFromID(port.id),
        label: `Reader ${i + 1}`,
        data: port.powers.map((power, j) => {
          return {
            x: times[j],
            y: power,
          };
        }),
        xAxesID: "x-axes",
        yAxesID: "y-axes",
        lineTension: 0,
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
          id: "y-axes",
          type: "linear",
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 70,
          },
        },
      ],
      xAxes: [
        {
          id: "x-axes",
          type: "linear",
          ticks: {
            beginAtZero: true,
            min: 0,
            max: times[times.length - 1],
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

const mapStateToProps = (state) => ({
  currentCircuitID: state.circuit.current,
  simulations: state.simulation.instances,
});

export default connect(mapStateToProps, null)(MeasuredOutputs);
