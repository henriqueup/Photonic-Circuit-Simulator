import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPlannedOutput } from "../../store";
import { savePlannedOutputs } from "../../store/ducks/powerSourcePlannedOutputs";
import { createPlannedOutput } from "../../utils/powerSource";
import "./styles.css";

const PowerSourceInspectionOutuputs = ({
  selectedComponent,
  savePlannedOutputs,
}) => {
  const [plannedOutputs, setPlannedOutputs] = useState([]);

  useEffect(() => {
    const savedPlannedOutput = getPlannedOutput(selectedComponent.id);

    if (!savedPlannedOutput) {
      console.log("Error: power source should have planned outputs saved.");
    }

    setPlannedOutputs(savedPlannedOutput);
  }, [selectedComponent]);

  const handleChangeOutput = (event, index) => {
    setPlannedOutputs(
      plannedOutputs.map((output, i) => {
        if (i === index) {
          return {
            ...output,
            power: parseFloat(event.target.value),
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
            time: parseFloat(event.target.value),
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

  const validatePlannedOutputs = () => {
    const uniqueOutputs = new Set(plannedOutputs.map((output) => output.time));
    if (uniqueOutputs.size !== plannedOutputs.length) {
      alert("Every output planned for a power source must have a unique time.");
      return false;
    }

    return true;
  };

  const handleSaveClick = () => {
    if (validatePlannedOutputs()) {
      savePlannedOutputs(selectedComponent.id, plannedOutputs);
    }
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
    setPlannedOutputs(plannedOutputs.concat([createPlannedOutput(0, 0)]));
  };

  return (
    <div className="powerSourceInspectionContainer">
      <div className="powerSourceOutputs">
        <span>Outputs:</span>
        {plannedOutputs.map((plannedOutput, i) => (
          <div
            className="portPowerItem"
            key={selectedComponent.id + "output" + i}
          >
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
          <div
            className="portPowerItem"
            key={selectedComponent.id + "time" + i}
          >
            <input
              className="powerInput"
              value={plannedOutput.time}
              onChange={(event) => handleChangeTime(event, i)}
              onFocus={handleFocus}
              disabled={i === 0}
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
