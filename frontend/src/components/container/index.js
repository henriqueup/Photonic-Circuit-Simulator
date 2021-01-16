import React from "react";
import "./styles.css";

const Container = ({ title, content, scrollable }) => {
  return (
    <div className="container">
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="container-content" style={scrollable && {height: "124px"}}>
        {content}
      </div>
    </div>
  );
};

export default Container;