import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Loading from "@/components/loading/index.js";
const App = lazy(() => import("@/App.js"));
const Login = lazy(() => import("@/pages/login"));
const Routers = () => (
  <Router>
    <Suspense
      fallback={() => {
        Loading();
      }}
    >
      <Switch>
        <Redirect exact path="/" to="/index.html" />
        <Route
          exact
          path="/index.html"
          component={props => <App {...props} />}
        />
        <Route
          exact
          path="/login.html"
          component={props => <Login {...props} />}
        />
      </Switch>
    </Suspense>
  </Router>
);

export default Routers;
