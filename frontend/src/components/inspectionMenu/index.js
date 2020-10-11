import React from "react";
import SelectedComponent from "../selectedComponent";
import "./styles.css";

const InspectionMenu = () => {
  return (
    <div className="inspectionMenu">
      <span className="inspectionMenuTitle">Inspection Menu</span>
      <SelectedComponent/>
    </div>
  );
};

export default InspectionMenu;
