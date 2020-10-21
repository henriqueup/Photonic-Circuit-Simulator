import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Tab = ({ activeTab, label, onClick }) => {
  const className = "tab-list-item" + (activeTab === label ? " tab-list-active" : "");

  return (
    <li className={className} onClick={() => onClick(label)}>
      {label}
    </li>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
