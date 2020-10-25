import React, { useEffect, useState, useRef } from "react";
import ComponentsMenu from "../components/componentsMenu";
import InspectionMenu from "../components/inspectionMenu";
import MainMenu from "../components/mainMenu";
import Workspace from "../components/workspace";
import MainMenuDropdown from "../components/mainMenuDropdown";
import "./styles.css";
import api from "../api";
import { store } from "../store";
import {
  attemptSave,
  create as createCircuit,
  attemptSetLabel as setCircuitLabel,
  setCurrent as setCurrentCircuit,
  simulate,
} from "../store/ducks/circuit";
import { basicKinds } from "../utils/componentBehaviour";
import Tabs from "../components/tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const buttons = [
  {
    name: "File",
    items: [
      {
        name: "New Circuit",
        onClick: () => store.dispatch(createCircuit()), //implement when workspace tabs
      },
      {
        name: "Save Circuit",
        onClick: () => {
          if (!store.getState().circuit.current.isSaved) {
            store.dispatch(attemptSave());
          }
        },
      },
    ],
  },
  {
    name: "Edit",
    items: [
      {
        name: "Remove Component",
        onClick: () => console.log("Delete selected component"),
      },
    ],
  },
];

export let WORKSPACE_X = 0;
export let WORKSPACE_Y = 0;

const Layout = ({ circuits, setCircuitLabel, currentCircuitID, setCurrentCircuit, createCircuit, circuitComponents, ports, simulate }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);
  const [left, setLeft] = useState(0);
  const [currentComponents, setCurrentComponents] = useState([]);
  const [currentConnections, setCurrentConnections] = useState([]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        //alert("You clicked outside of me!");
        setShowDropdown(!showDropdown);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, showDropdown]);

  const onClickMenuButton = () => {
    setShowDropdown(!showDropdown);
  };

  const onMouseEnterMenuButton = (index) => {
    setCurrentButton(buttons[index]);
    const element = document.getElementById(buttons[index].name);
    setLeft(element.getBoundingClientRect().left);
  };

  useEffect(() => {
    async function startConnection() {
      await api.resetCircuits();
      createCircuit();
    }

    startConnection();
  }, [createCircuit]);

  useEffect(() => {
    const currentCircuit = circuits.find((circuit) => circuit.id === currentCircuitID);
    if (currentCircuit) {
      setCurrentComponents(circuitComponents.filter((component) => currentCircuit.components.includes(component.id)));
      setCurrentConnections(currentCircuit.connections);
    }
  }, [currentCircuitID, circuits, circuitComponents]);

  return (
    <div className="main">
      <MainMenu buttons={buttons} onClick={onClickMenuButton} onMouseEnter={onMouseEnterMenuButton} />
      <div ref={dropdownRef} className="mainMenuDropdown" style={{ left: left }}>
        {showDropdown ? <MainMenuDropdown items={currentButton ? currentButton.items : []} /> : null}
      </div>
      <div className="screen">
        <ComponentsMenu basicItems={basicKinds} />
        <Tabs activeTab={currentCircuitID} setActiveTab={(id) => setCurrentCircuit(id)} setTitle={setCircuitLabel}>
          {circuits.map((circuit) => (
            <div
              id={circuit.id}
              label={circuit.label}
              isSaved={circuit.isSaved}
              key={circuit.id}
              ref={(element) => {
                if (!element) return;

                const rect = element.getBoundingClientRect();
                WORKSPACE_X = rect.x;
                WORKSPACE_Y = rect.y;
              }}
            >
              <Workspace circuitComponents={currentComponents} connections={currentConnections} heightOffset={WORKSPACE_Y} />
            </div>
          ))}
        </Tabs>
        <InspectionMenu
          outputReaders={currentComponents.filter((component) => component.kind.kind === "output_reader")}
          ports={ports}
          simulate={simulate}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  circuits: state.circuit.instances,
  currentCircuitID: state.circuit.current,
  circuitComponents: state.circuitComponent.instances,
  ports: state.port.instances,
});

const mapDispatchToProps = (dispatch) => ({
  setCircuitLabel: bindActionCreators(setCircuitLabel, dispatch),
  setCurrentCircuit: bindActionCreators(setCurrentCircuit, dispatch),
  createCircuit: bindActionCreators(createCircuit, dispatch),
  simulate: bindActionCreators(simulate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
