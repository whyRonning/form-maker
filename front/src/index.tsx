import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "./AppContainer";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
import "./accets/FAIcons";

  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
