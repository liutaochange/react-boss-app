import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Loading from "Components/loading/index.js";
const App = lazy(() => import("@/App.js"));
const Login = lazy(() => import("Pages/login"));
const Register = lazy(() => import("Pages/register"));
const Boss = lazy(() => import("Pages/boss"));
const Genius = lazy(() => import("Pages/genius"));
const Routers = () => (
  <Router>
    <Suspense
      fallback={<Loading />}
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
        <Route
          exact
          path="/register.html"
          component={props => <Register {...props} />}
        />
        <Route
          exact
          path="/boss.html"
          component={props => <Boss {...props} />}
        />
        <Route
          exact
          path="/genius.html"
          component={props => <Genius {...props} />}
        />
      </Switch>
    </Suspense>
  </Router>
);

export default Routers;
