import React from "react";
import { getPortData } from "../../store";
import "./styles.css";

const InspectionOutputs = ({ selectedComponent }) => {
  return (
    <>
      <span>Outputs:</span>
      {selectedComponent.outputs.map((portID) => {
        const port = getPortData(portID);

        return (
          <li className="portPowerItem" key={port.id}>
            <input
              className="powerInput"
              disabled={true}
              value={port.power}
              type="number"
            />
          </li>
        );
      })}
    </>
  );
};

export default InspectionOutputs;
