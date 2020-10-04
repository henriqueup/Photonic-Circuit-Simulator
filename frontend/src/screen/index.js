import React, { useState } from "react";
import ComponentsMenu from "../components/componentsMenu";
import InspectionMenu from "../components/inspectionMenu";
import MainMenu from "../components/mainMenu";
import Workspace from "../components/workspace";
import MainMenuDropdown from "../components/mainMenuDropdown";
import "./styles.css";

const buttons = [
  {
    name: "File",
    items: [
      {
        name: "New Circuit",
        onClick: () => console.log("Create new circuit"),
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

  const onClick = () => {
    setShowDropdown(!showDropdown);
  };

  const onMouseEnter = (index) => {
    setCurrentButton(buttons[index]);
    const element = document.getElementById(buttons[index].name);
    setLeft(element.getBoundingClientRect().left);
  };

  return (
    <div className="main">
      <MainMenu buttons={buttons} onClick={onClick} onMouseEnter={onMouseEnter} />
      <div className="mainMenuDropdown" style={{ left: left }}>
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
