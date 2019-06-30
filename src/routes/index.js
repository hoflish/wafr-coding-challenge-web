import React from "react";
import { Route, Switch } from "react-router-dom";

import * as ROUTES from "./constants";
import Home from "../views/Home";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";

const Routes = () => (
  <Switch>
    <Route exact path={ROUTES.baseUrl} component={Home} />
    <Route path={ROUTES.signUpUrl} component={SignUp} />
    <Route path={ROUTES.signInUrl} component={SignIn} />
    <Route component={() => <div>Not found</div>} />
  </Switch>
);

export default Routes;