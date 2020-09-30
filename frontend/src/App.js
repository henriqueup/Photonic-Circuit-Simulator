import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store";
import "./App.css";
import Layout from "./screen";

const App = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;
