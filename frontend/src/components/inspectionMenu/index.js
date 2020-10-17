import React from "react";
import SelectedComponent from "../selectedComponent";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./styles.css";
import { simulate } from "../../store/ducks/circuit";

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

const mapDispatchToProps = (dispatch) => ({
  simulate: bindActionCreators(simulate, dispatch),
});

export default connect(null, mapDispatchToProps)(InspectionMenu);
