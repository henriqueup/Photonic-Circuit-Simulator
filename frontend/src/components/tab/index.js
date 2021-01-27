import React, { useState } from "react";
import PropTypes from "prop-types";
import { XCircle } from "react-feather";
import "./styles.css";

const Tab = ({
  activeTab,
  id,
  label,
  isSaved,
  onClick,
  setTitle,
  handleCloseClick,
}) => {
  const className =
    "tab-list-item" + (activeTab === id ? " tab-list-active" : "");
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(label);
  const [dirty, setDirty] = useState(false);

  let timer = 0;
  let delay = 200;
  let prevent = false;

  const handleClick = () => {
    timer = setTimeout(() => {
      if (!prevent) {
        onClick(id);
      }
      prevent = false;
    }, delay);
  };

  const handleDoubleClick = (event) => {
    clearTimeout(timer);
    prevent = true;

    setDisabled(false);
    if (event.target.select) {
      event.target.select();
    }
  };

  const handleBlur = () => {
    setDisabled(true);

    if (dirty) {
      const tabName = isSaved ? value : value.substring(value.length - 2);
      setTitle(tabName);
      setDirty(false);
    }
  };

  const handleChange = (event) => {
    const tabName = isSaved
      ? event.target.value
      : event.target.value.substring(value.length - 2);
    setValue(tabName);
    setDirty(true);
  };

  const handleKeyDown = (event) => {
    const escapeKeys = ["Escape", "Enter"];
    if (escapeKeys.includes(event.key)) {
      handleBlur();
    }
  };

  return (
    <li
      className={className}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="tabContainer">
        <input
          className="tabTitle"
          readOnly={disabled}
          onBlur={handleBlur}
          value={isSaved ? value : value + " *"}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <XCircle
          size={16}
          className="closeIcon"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleCloseClick(id);
          }}
        />
      </div>
    </li>
  );
};

Tab.propTypes = {
  // activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
