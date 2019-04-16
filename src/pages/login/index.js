import React from "react";
import Logo from "@/components/logo";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button>登录</Button>
          <WhiteSpace />
          <Button>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default withRouter(Login);
