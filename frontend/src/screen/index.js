import React from "react";
import ComponentsMenu from "../components/componentsMenu";
import InspectionMenu from "../components/inspectionMenu";
import MainMenu from "../components/mainMenu";
import Workspace from "../components/workspace";
import "./styles.css";

const Layout = () => {
  return (
    <div className="main">
      <MainMenu />
      <div className="screen">
        <ComponentsMenu />
        <Workspace />
        <InspectionMenu />
      </div>
    </div>
  );
};

export default Layout;
