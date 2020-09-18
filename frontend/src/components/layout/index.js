import React from "react";
import ComponentsMenu from "../componentsMenu";
import InspectionMenu from "../inspectionMenu";
import MainMenu from "../mainMenu";
import Workspace from "../workspace";
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
