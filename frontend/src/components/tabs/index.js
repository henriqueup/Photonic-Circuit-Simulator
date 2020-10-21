import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tab from "../tab";
import "./styles.css";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (children && children.length && !activeTab) {
      setActiveTab(children[0].props.label);
    }
  }, [children, activeTab]);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { label } = child.props;
          return <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem} />;
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Tabs;
