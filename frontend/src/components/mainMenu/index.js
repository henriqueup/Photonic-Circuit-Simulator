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

  return (
    <div className="mainMenu">
      <span>{name}</span>
    </div>
  );
};

export default MainMenu;
