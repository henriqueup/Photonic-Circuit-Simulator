const MainMenuButtonItem = (name, onClick, composite, setItems) => {
  return {
    name: name,
    onClick: onClick,
    composite: composite,
    setItems: setItems,
  }
}

export default MainMenuButtonItem;