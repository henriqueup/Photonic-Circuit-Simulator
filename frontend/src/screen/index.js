import React, { useEffect, useState, useRef } from "react";
import ComponentsMenu from "../components/componentsMenu";
import InspectionMenu from "../components/inspectionMenu";
import MainMenu from "../components/mainMenu";
import Workspace from "../components/workspace";
import MainMenuDropdown from "../components/mainMenuDropdown";
import "./styles.css";
import api from "../api";
import { store } from "../store";
import { attemptSave, create as createCircuit } from "../store/ducks/circuit";
import { basicKinds } from "../utils/componentBehaviour";

const buttons = [
  {
    name: "File",
    items: [
      {
        name: "New Circuit",
        onClick: () => console.log(store.getState().circuit), //implement when workspace tabs
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

const Layout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);
  const [left, setLeft] = useState(0);

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
      await api.deleteCircuit();
      store.dispatch(createCircuit());
    }

    console.log("using effect");
    startConnection();
  }, []);

  return (
    <div className="main">
      <MainMenu buttons={buttons} onClick={onClickMenuButton} onMouseEnter={onMouseEnterMenuButton} />
      <div ref={dropdownRef} className="mainMenuDropdown" style={{ left: left }}>
        {showDropdown ? <MainMenuDropdown items={currentButton ? currentButton.items : []} /> : null}
      </div>
      <div className="screen">
        <ComponentsMenu basicItems={basicKinds} />
        <div ref={element => {
          if (!element) return;

          const rect = element.getBoundingClientRect();
          WORKSPACE_X = rect.x;
          WORKSPACE_Y = rect.y;
        }}>
          <Workspace />
        </div>
        <InspectionMenu />
      </div>
    </div>
  );
};

export default Layout;
