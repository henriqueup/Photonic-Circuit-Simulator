import React from "react";
import PropTypes from "prop-types";
import Tab from "../tab";
import "./styles.css";

const Tabs = ({
  children,
  activeTab,
  setActiveTab,
  setTitle,
  handleCloseTab,
}) => {
  const handleClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { label, isSaved, id } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={id}
              id={id}
              label={label}
              isSaved={isSaved}
              onClick={handleClick}
              setTitle={setTitle}
              handleCloseClick={handleCloseTab}
            />
          );
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
