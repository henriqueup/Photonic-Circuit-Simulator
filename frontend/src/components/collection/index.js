import React, { useEffect, useState } from "react";
import "./styles.css";

const Collection = () => {
  const [items, setItems] = useState([]);
  const initialize = () => {
    const initialItems = ["Switch N", "Switch P", "Power Source"];

    let newItems = [];
    initialItems.forEach((item) => newItems.push(item));

    setItems(newItems);
  };

  useEffect(initialize, []);

  return (
    <div className="collectionContainer">
      <div className="collectionTitle">
        <span>Basic Components</span>
      </div>
      {items.map((item, index) => (
        <li className="collectionItem" key={index}>
          {item}
        </li>
      ))}
    </div>
  );
};

export default Collection;
