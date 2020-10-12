import React from 'react';
import Container from "../container";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import './styles.css';
import { store } from '../../store';
import InspectionOutputs from '../inspectionOutputs';
import { calculateOutputs } from '../../store/ducks/circuitComponent';

const SelectedComponent = ({selectedComponent, calculateOutputs}) => {
  const getPortData = (portID) => {
    return store.getState().port.instances.find(port => port.id === portID);
  }

  return (
    <div>
      <Container title={"Selected Component"}
        content={ selectedComponent != null
          ? <div className="selectedData">
              <span className="selectedKind">Kind: {selectedComponent.kind.name}</span>
              <div className="selectedPorts">
                {
                  selectedComponent.inputs && selectedComponent.inputs.length
                  ? <div className="selectedPortsValues">
                      <span>Inputs:</span>
                      {selectedComponent.inputs.map((portID) => {
                        const port = getPortData(portID);
                        return (
                          <li className="portPowerItem" key={port.id}>
                            <span>{port.power.toFixed(4)}</span>
                          </li>
                        )
                      })}
                    </div>
                  : null
                }
                {
                  selectedComponent.outputs && selectedComponent.outputs.length
                  ? <div className="selectedPortsValues">
                      <span>Outputs:</span>
                      {selectedComponent.outputs.map((portID) => {
                        const port = getPortData(portID);
                        return (
                          <InspectionOutputs key={port.id} selectedComponent={selectedComponent} port={port}/>
                        )
                      })}
                    </div>
                  : null
                }
              </div>
              <div className="selectedPorts">
                <div className="selectedPortsValues">
                  <span>X: {selectedComponent.x}</span>
                </div>
                <div className="selectedPortsValues">
                  <span>Y: {selectedComponent.y}</span>
                </div>
              </div>
              <button onClick={() => calculateOutputs(selectedComponent.id, selectedComponent.outputs)}>Calculate Outputs</button>
            </div>
          : null
        }
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedComponent: state.circuitComponent.selected,
});

const mapDispatchToProps = (dispatch) => ({
  calculateOutputs: bindActionCreators(calculateOutputs, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedComponent);