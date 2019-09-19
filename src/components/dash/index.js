import React from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import { Switch, Route, withRouter } from "react-router-dom";
import NavLinkBar from "../tabbar/index";
const Dash = props => {
  const { pathname } = props.location;
  const navList = [
    {
      path: "/boss",
      text: "牛人",
      icon: "boss",
      title: "牛人列表"
    },
    {
      path: "/genius",
      text: "boss",
      icon: "job",
      title: "BOSS列表"
    },
    {
      path: "/msg",
      text: "消息",
      icon: "msg",
      title: "消息列表"
    },
    {
      path: "/me",
      text: "我",
      icon: "user",
      title: "个人中心"
    }
  ];
  return (
    <div>
      <NavBar className="fixd-header" mode="dard">
        {navList.find(v => v.path === pathname).title}
      </NavBar>
      <div style={{ marginTop: 45 }}>
        <Switch>
          {navList.map(v => (
            <Route key={v.path} path={v.path} component={v.component}></Route>
          ))}
        </Switch>
      </div>

      <NavLinkBar data={navList}></NavLinkBar>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    isLogin: user.isLogin,
    info: user.info
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(Dash));
