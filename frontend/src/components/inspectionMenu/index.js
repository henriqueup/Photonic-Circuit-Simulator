import React from "react";
import SelectedComponent from "../selectedComponent";
import "./styles.css";

const InspectionMenu = ({ simulate }) => {
  return (
    <div className="inspectionMenu">
      <span className="inspectionMenuTitle">Inspection Menu</span>
      <SelectedComponent />
      <button className="simulateButton" onClick={simulate}>
        Simulate
      </button>
    </div>
  );
};

export default InspectionMenu;
