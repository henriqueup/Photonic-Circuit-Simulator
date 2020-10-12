import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setPower } from '../../store/ducks/circuitComponent';
import './styles.css';

const InspectionOutputs = ({selectedComponent, port, setPower}) => {
  const [power, setPowerState] = useState(port.power);
  const disableEdition = selectedComponent.kind.kind !== "power_source";

  const handleChange = (event) => {
    setPowerState(Number.parseFloat(event.target.value));
  }

  const handleKeyDown = (event) => {
    //TODO: validate pressed keys
    // if (!Number(event.key) && (event.key !== '.' && event.key !== ',')){
    //   event.preventDefault();
    // }
  }

  useEffect(() => {
    setPowerState(port.power);
  }, [port])

  return (
    <li className="portPowerItem" key={port.id}>
      <input
        className="powerInput"
        disabled={disableEdition}
        value={power.toFixed(4)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="number"
      />
      {disableEdition
        ? null
        : <button onClick={() => setPower(selectedComponent.id, port.id, Number.parseFloat(power))}>Save</button>
      }
    </li>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setPower: bindActionCreators(setPower, dispatch),
});

export default connect(null, mapDispatchToProps)(InspectionOutputs);