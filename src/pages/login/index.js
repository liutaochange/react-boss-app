import React, { useState, useEffect } from "react";
import Logo from "@/components/logo";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { withRouter } from "react-router-dom";

const Login = props => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const login = () => {
    useEffect(() => {
    
    })
  }
  return (
    <div>
      <Logo />
      <WingBlank>
        <List>
          {msg?<p className='error-msg'>{msg}</p>:null}
          <WhiteSpace />
          <InputItem value={user} placeholder="请输入用户名" onChange={(val) => {
            console.log(val)
          }}>用户</InputItem>
          <WhiteSpace />
          <InputItem value={password} placeholder="请输入密码" onChange={(val) => {
            console.log(val)
          }}>密码</InputItem>
        </List>
        <WhiteSpace />
        <Button onClick={login}>登录</Button>
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
