import React from "react";
import logo from "./logo.svg";
import { connect } from "react-redux";
import "./App.css";
import { withRouter } from "react-router-dom";
const App = props => {
  const toLogin = () => {
    props.history.push("/login.html");
  }
  console.log(props)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p
          className="App-link"
          onClick={toLogin}
        >
          login
        </p>
      </header>
    </div>
  );
}
const mapStateToProps = ({ user }) => {
  return {
    isLogin: user.isLogin,
    info: user.info,
  };
};
export default connect(mapStateToProps, null)(withRouter(App));
