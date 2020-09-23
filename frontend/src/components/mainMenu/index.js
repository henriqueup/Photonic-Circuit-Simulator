import React, { useEffect, useState } from "react";
import "./styles.css";

const MainMenu = () => {
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
      <div className="mainMenuButton">{name}</div>
    </div>
  );
};

export default MainMenu;
