import React, { useState } from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AvatarSelector from "Components/avator/index";
const Boss = props => {
  if (!props.isLogin) {
    props.history.push("login.html");
  }
  let [info, setInfo] = useState({
    title: "",
    desc: "",
    company: "",
    money: "",
    avatar: ""
  });
  const onChange = (key, val) => {
    setInfo(info => ({
      ...info,
      [key]: val
    }));
  };
  return (
    <div>
      <NavBar mode="dark">BOSS完善信息页</NavBar>
      <AvatarSelector
        selectAvatar={imgname => {
          setInfo(info => ({
            ...info,
            avatar: imgname
          }));
        }}
      />
      <InputItem onChange={v => onChange("title", v)}>招聘职位</InputItem>
      <InputItem onChange={v => onChange("company", v)}>公司名称</InputItem>
      <InputItem onChange={v => onChange("money", v)}>职位薪资</InputItem>
      <TextareaItem
        onChange={v => this.onChange("desc", v)}
        rows={3}
        autoHeight
        title="职位要求"
      />
      <Button
        onClick={() => {
          props.update(info);
        }}
        type="primary"
        style={{ width: "96%", margin: "0 auto" }}
      >
        保存
      </Button>
    </div>
  );
};
const mapStateToProps = ({ user }) => {
  return {
    isLogin: user.isLogin,
    info: user.info
  };
};
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Boss));
