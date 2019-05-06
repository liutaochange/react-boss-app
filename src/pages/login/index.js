import React, { useState } from "react";
import Logo from "Components/logo";
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { login } from "@/api/index";
import Store from "Assets/js/utils";
const Login = props => {
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
  const submitLogin = () => {
    if (user === '' || user.length < 2) {
      Toast.info('用户名不能少于2位', 1);
      return false;
    }
    if (password === '' || password.length < 6) {
      Toast.info('密码不能少于6位', 1);
      return false;
    }
    login(user, password).then(res => {
      if (res.data.code === 0) {
        Store.set('__USER_INFO__', res.data.data);
        if (res.data.data.type === 'genius') {
          props.history.push('index.html');
        } else {
          props.history.push('index.html');
        }
      }
    }).catch(err => {
      Toast.info(err, 1);
    });
  };
  return (
    <div>
      <Logo />
      <WingBlank>
        <List>
          <InputItem
            value={user}
            placeholder="请输入用户名"
            onChange={val => {
              setUser(val);
            }}
          >
            用户
          </InputItem>
          <InputItem
            value={password}
            type="password"
            placeholder="请输入密码"
            onChange={val => {
              setPassword(val);
            }}
          >
            密码
          </InputItem>
        </List>
        <WhiteSpace />
        <Button onClick={submitLogin}>登录</Button>
        <WhiteSpace />
        <Button
          onClick={() => {
            props.history.push("/register.html");
          }}
        >
          注册
        </Button>
      </WingBlank>
    </div>
  );
};

export default withRouter(Login);
