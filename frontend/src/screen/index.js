import React, { useEffect, useState, useRef } from "react";
import ComponentsMenu from "../components/componentsMenu";
import InspectionMenu from "../components/inspectionMenu";
import MainMenu from "../components/mainMenu";
import Workspace from "../components/workspace";
import MainMenuDropdown from "../components/mainMenuDropdown";
import "./styles.css";
import api from "../api";
import { store } from "../store";
import { create as createCircuit, save } from "../store/ducks/circuit";

const buttons = [
  {
    name: "File",
    items: [
      {
        name: "New Circuit",
        onClick: () => console.log(store.getState().circuit),
      },
      {
        name: "Save Circuit",
        onClick: () => {
          if (!store.getState().circuit.current.isSaved) {
            store.dispatch(save());
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

const Layout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);
  const [left, setLeft] = useState(0);

  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (showDropdown && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      //alert("You clicked outside of me!");
      setShowDropdown(!showDropdown);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, showDropdown]);

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
      <div ref={wrapperRef} className="mainMenuDropdown" style={{ left: left }}>
        {showDropdown ? <MainMenuDropdown items={currentButton ? currentButton.items : []} /> : null}
      </div>
      <div className="screen">
        <ComponentsMenu />
        <Workspace />
        <InspectionMenu />
      </div>
    </div>
  );
};

export default Layout;
