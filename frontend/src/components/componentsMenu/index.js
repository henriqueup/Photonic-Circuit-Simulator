import React from "react";
import Collection from "../collection";
import { create } from "../../store/ducks/circuitComponent";
import "./styles.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const ComponentsMenu = ({ basicItems, customItems, addComponent }) => {
  return (
    <div className="componentsMenu">
      <span className="componentsMenuTitle">Components Menu</span>
      <Collection items={basicItems} onClick={addComponent} title={"Basic Components"} />
      <Collection items={customItems} onClick={addComponent} title={"Custom Components"} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addComponent: bindActionCreators(create, dispatch),
});

export default connect(null, mapDispatchToProps)(ComponentsMenu);
