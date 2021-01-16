import React from "react";
import Container from "../container";
import "./styles.css";

const Collection = ({ items, onClick, title, scrollable }) => {
  const stub = <li className="stubItem" key={-1} />;

  return (
    <Container
      title={title}
      content={[stub].concat(
        items.map((item, index) => (
          <li className="collectionItem" key={index} onClick={() => onClick(item.kind)}>
            {item.name}
          </li>
        ))
      )}
      scrollable
    />
  );
};

export default Collection;
