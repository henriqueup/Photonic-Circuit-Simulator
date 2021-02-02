import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPlannedOutput, getPortData } from "../../store";
import { savePlannedOutputs } from "../../store/ducks/powerSourcePlannedOutputs";
import "./styles.css";

const createPlannedOutput = (power, time) => {
  return {
    power: power,
    time: time,
  };
};

const PowerSourceInspectionOutuputs = ({
  selectedComponent,
  savePlannedOutputs,
}) => {
  const port = getPortData(selectedComponent.outputs[0]);
  const [plannedOutputs, setPlannedOutputs] = useState([
    createPlannedOutput(port.power, 0),
  ]);

  useEffect(() => {
    const savedPlannedOutput = getPlannedOutput(selectedComponent.id);
    if (savedPlannedOutput) {
      setPlannedOutputs(savedPlannedOutput);
    } else {
      setPlannedOutputs([createPlannedOutput(port.power, 0)]);
    }
  }, [selectedComponent, port]);

  const handleChangeOutput = (event, index) => {
    setPlannedOutputs(
      plannedOutputs.map((output, i) => {
        if (i === index) {
          return {
            ...output,
            power: event.target.value,
          };
        }
        return output;
      })
    );
  };

  const handleChangeTime = (event, index) => {
    setPlannedOutputs(
      plannedOutputs.map((output, i) => {
        if (i === index) {
          return {
            ...output,
            time: event.target.value,
          };
        }
        return output;
      })
    );
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleBlur = (event) => {
    // setPowerState(Number.parseFloat(event.target.value).toFixed(4));
  };

  const handleSaveClick = () => {
    savePlannedOutputs(selectedComponent.id, plannedOutputs);
  };

  const handleKeyDown = (event) => {
    //TODO: navigation enhancements
    // if (event.key === "Enter") {
    //   handleSaveClick();
    // }
    //TODO: validate pressed keys to create mask
    // if (!Number(event.key) && (event.key !== '.' && event.key !== ',')){
    //   event.preventDefault();
    // }
  };

  const handleAddClick = () => {
    setPlannedOutputs(
      plannedOutputs.concat([createPlannedOutput(port.power, 0)])
    );
  };

  return (
    <div className="powerSourceInspectionContainer">
      <div className="powerSourceOutputs">
        <span>Outputs:</span>
        {plannedOutputs.map((plannedOutput, i) => (
          <div className="portPowerItem" key={port.id + "output" + i}>
            <input
              className="powerInput"
              value={plannedOutput.power}
              onChange={(event) => handleChangeOutput(event, i)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="number"
            />
          </div>
        ))}
        <button className="addOutputButton" onClick={handleAddClick}>
          Add Value
        </button>
      </div>
      <div className="powerSourceTime">
        <span>Time:</span>
        {plannedOutputs.map((plannedOutput, i) => (
          <div className="portPowerItem" key={port.id + "time" + i}>
            <input
              className="powerInput"
              value={plannedOutput.time}
              onChange={(event) => handleChangeTime(event, i)}
              onFocus={handleFocus}
              type="number"
            />
          </div>
        ))}
        <button className="saveButton" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  savePlannedOutputs: bindActionCreators(savePlannedOutputs, dispatch),
});

export default connect(null, mapDispatchToProps)(PowerSourceInspectionOutuputs);
