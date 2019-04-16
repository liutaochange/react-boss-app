import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getUserInfo, addUser } from "@/api/index";
import { withRouter } from "react-router-dom";
class App extends Component {
  componentDidMount() {
    addUser().then(res => {
      console.log(res);
    });
    getUserInfo().then(res => {
      console.log(res);
    });
  }
  toLogin = () => {
    this.props.history.push("/login.html");
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p
            className="App-link"
            onClick={this.toLogin}
          >
            login
          </p>
        </header>
      </div>
    );
  }
}

export default withRouter(App);
