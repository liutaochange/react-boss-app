import React from "react";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
const NavLinkBar = props => {
  const { pathname } = props.location;
  const { info } = props;
  const navList = [
    {
      path: "/boss",
      text: "牛人",
      icon: "boss",
      title: "牛人列表",
      hide: info.type === "genius"
    },
    {
      path: "/genius",
      text: "boss",
      icon: "job",
      title: "BOSS列表",
      hide: info.type === "boss"
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
  const List = navList.filter(v => !v.hide);
  return (
    <TabBar>
      {List.map(v => (
        <TabBar.Item
          badge={v.path === "/msg" ? props.unread : 0}
          key={v.path}
          title={v.text}
          icon={{ uri: require(`./img/${v.icon}.png`) }}
          selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
          selected={pathname === v.path}
          onPress={() => {
            props.history.push(v.path);
          }}
        ></TabBar.Item>
      ))}
    </TabBar>
  );
};
const mapStateToProps = ({ user }) => {
  return {
    info: user.info
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(NavLinkBar));
