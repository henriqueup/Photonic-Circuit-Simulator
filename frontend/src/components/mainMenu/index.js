import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setX } from "../../store/ducks/circuitComponent";
import "./styles.css";

const MainMenu = ({ setX }) => {
  const [name, setName] = useState("nome default");
  const initializeName = () => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setName(data.message))
      .catch((err) => err);
    // setName("Initial Name");
  };

  useEffect(initializeName, []);

  const fileClick = () => {
    alert("File button clicked.");
  };

  return (
    <div className="mainMenu">
      <div className="mainMenuButton" onClick={fileClick}>
        File
      </div>
      <div className="mainMenuButton" onClick={setX}>
        {name}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setX: bindActionCreators(setX, dispatch),
});

export default connect(null, mapDispatchToProps)(MainMenu);
