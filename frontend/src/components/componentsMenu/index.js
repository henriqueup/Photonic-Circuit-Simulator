import React from "react";
import Collection from "../collection";
import { create } from "../../store/ducks/circuitComponent";
import "./styles.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const ComponentsMenu = ({ basicItems, addComponent }) => {
  return (
    <div className="componentsMenu">
      <span className="componentsMenuTitle">Components Menu</span>
      <Collection items={basicItems} onClick={addComponent} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  basicItems: state.circuitComponent.basicKinds,
});

const mapDispatchToProps = (dispatch) => ({
  addComponent: bindActionCreators(create, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComponentsMenu);
