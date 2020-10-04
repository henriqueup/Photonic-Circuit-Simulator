import React from "react";
import "./styles.css";

const Collection = ({ items, onClick }) => {
  return (
    <div className="collectionContainer">
      <div className="collectionTitle">
        <span>Basic Components</span>
      </div>
      {items.map((item, index) => (
        <li className="collectionItem" key={index} onClick={onClick}>
          {item}
        </li>
      ))}
    </div>
  );
};

export default Collection;
