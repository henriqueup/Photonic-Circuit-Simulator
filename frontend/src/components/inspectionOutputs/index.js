import React from 'react';
import './styles.css';

const InspectionOutputs = ({ port }) => {
  return (
    <li className="portPowerItem">
      <input
        className="powerInput"
        disabled={true}
        value={port.power}
        type="number"
      />
    </li>
  );
}

export default InspectionOutputs;