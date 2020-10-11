import React from "react";
import "./styles.css";

const Container = ({ title, content }) => {
  return (
    <div className="container">
      <div className="title">
        <span>{title}</span>
      </div>
      {content}
    </div>
  );
};

export default Container;