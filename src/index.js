import "./app.scss";

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import { history } from "./history";
import { FirebaseProvider } from "./contexts/firebase-context";
import { UserProvider } from "./contexts/user-context";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <FirebaseProvider>
    <UserProvider>
      <Router history={history}>
        <App />
      </Router>
    </UserProvider>
  </FirebaseProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
