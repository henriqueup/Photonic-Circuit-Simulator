import React from "react";
import "./styles.css";

const DropdownItems = ({ items }) => {
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

export default DropdownItems;
