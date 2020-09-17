import React, { useEffect, useState } from "react";

const Layout = () => {
  const [name, setName] = useState("nome default");
  const initializeName = () => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setName(data.message))
      .catch((err) => err);
    // setName("Initial Name");
  };

  useEffect(initializeName, []);

  return <div>{name}</div>;
};

export default Layout;
