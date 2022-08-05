// React Import
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
// import { HashRouter } from "react-router-dom";
// Redux Import
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "./store/reducers/index";
import App from "./App";
const store = createStore(reducers, compose(applyMiddleware(thunk)));
// Component Import
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

 