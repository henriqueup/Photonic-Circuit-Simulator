import React from "react";
import "./styles.css";

const MainMenuDropdown = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <li className="collectionItem" key={index} onClick={item.onClick}>
          {item.name}
        </li>
      ))}
    </div>
  );
};

export default MainMenuDropdown;
