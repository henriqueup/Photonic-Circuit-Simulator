import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tab from "../tab";
import "./styles.css";

const Tabs = ({ children, setTitle, doClickAction }) => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (children && children.length && !activeTab) {
      setActiveTab(children[0].props.id);
    }
  }, [children, activeTab]);

  const handleClick = (tab) => {
    doClickAction(tab);
    const childTab = children.find((child) => child.props.label === tab);
    setActiveTab(childTab.props.id);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { label, isSaved, id } = child.props;
          return <Tab activeTab={activeTab} key={id} id={id} label={label} isSaved={isSaved} onClick={handleClick} setTitle={setTitle} />;
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.id !== activeTab) return undefined;
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
