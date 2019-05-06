import React, { useState } from "react";
import Logo from "Components/logo";
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button,
  Toast
} from "antd-mobile";
import { withRouter } from "react-router-dom";
import { register } from "@/api/index";
import { connect } from "react-redux";
import Store from "Assets/js/utils";
import { changeUserInfo } from 'Redux/action/index';
const Register = props => {
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
  let [repeatpwd, setRepeatpwd] = useState("");
  let [type, setType] = useState("genius");
  const handleRegister = () => {
    if (user === "" || user.length < 2) {
      Toast.info("用户名不能少于2位", 1);
      return false;
    }
    if (password === "" || password.length < 6) {
      Toast.info("密码不能少于6位", 1);
      return false;
		}
		if (password !== repeatpwd) {
      Toast.info("密码不一致", 1);
      return false;
    }
		register(user, password, type).then(res => {
			if (res.data.code === 0) {
        Store.set("__USER_INFO__", res.data.data);
        props.changeUserInfo(res.data.data)
				if (res.data.data.type === 'genius') {
          props.history.push('index.html');
        } else {
          props.history.push('index.html');
        }
			} else {
        Toast.info(res.data.msg, 1);
      }
		}).catch(err => {
			console.log(err);
		});
  };
  const RadioItem = Radio.RadioItem;
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
            用户名
          </InputItem>
          <InputItem
            type="password"
            value={password}
            placeholder="请输入密码"
            onChange={val => {
              setPassword(val);
            }}
          >
            密码
          </InputItem>
          <InputItem
            type="password"
            value={repeatpwd}
            placeholder="请确认密码"
            onChange={val => {
              setRepeatpwd(val);
            }}
          >
            确认密码
          </InputItem>
          <RadioItem
            checked={type === "genius"}
            onChange={() => {
							setType("genius")
						}}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={type === "boss"}
            onChange={() => {
							setType("boss")
						}}
          >
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={handleRegister}>
            注册
          </Button>
        </List>
      </WingBlank>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  changeUserInfo: userInfo => {
    dispatch(changeUserInfo(userInfo));
  },
})
export default connect(null, mapDispatchToProps)(withRouter(Register));
