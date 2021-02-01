import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setPower } from '../../store/ducks/circuitComponent';
import './styles.css';

const createPlannedOutput = (power, time) => {
    return {
        power: power,
        time: time
    }
}

const PowerSourceInspectionOutuputs = ({ selectedComponent, port, setPower }) => {
    const [power, setPowerState] = useState(port.power);
    const [plannedOutputs, setPlannedOutputs] = useState([createPlannedOutput(port.power, 0)]);

    const handleChange = (event) => {
        setPowerState(Number.parseFloat(event.target.value));
    }

    const handleFocus = (event) => {
        event.target.select();
    }

    const handleBlur = (event) => {
        setPowerState(Number.parseFloat(event.target.value).toFixed(4));
    }

    const handleSaveClick = () => {
        setPower(selectedComponent.id, port.id, Number.parseFloat(power));
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSaveClick();
        }
        //TODO: validate pressed keys to create mask
        // if (!Number(event.key) && (event.key !== '.' && event.key !== ',')){
        //   event.preventDefault();
        // }
    }

    const handleAddClick = () => {
        setPlannedOutputs(plannedOutputs.concat([createPlannedOutput(port.power, 0)]));
    }

    useEffect(() => {
        setPowerState(port.power);
    }, [port])

    return (
        <>
            {plannedOutputs.map(plannedOutput =>
                <div className="portPowerItem">
                    <input
                        className="powerInput"
                        value={plannedOutput.power}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        type="number"
                    />
                    <input
                        className="powerInput"
                        value={plannedOutput.time}
                        type="number"
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            )}
            <button onClick={handleAddClick}>Add Output Value</button>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setPower: bindActionCreators(setPower, dispatch),
});

export default connect(null, mapDispatchToProps)(PowerSourceInspectionOutuputs);