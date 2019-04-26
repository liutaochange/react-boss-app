import React, { useState } from "react";
import Logo from "@/components/logo";
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
import Store from "@/assets/js/utils";
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
			if (res.code === 0) {
				Store.set("__USER_INFO__", res.data);
				props.history.push("index.html");
			}
		}).catch(err => {
			console.log(err);
			// Toast.info(err, 1);
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
export default withRouter(Register);
