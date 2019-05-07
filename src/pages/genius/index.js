import React, { useState } from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelector from "Components/avator/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const Genius = props => {
  if (!props.isLogin) {
    props.history.push("login.html");
  }
  let [info, setInfo] = useState({
    title: "",
    desc: "",
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
      <NavBar mode="dark">牛人完善信息页</NavBar>
      <AvatarSelector
        selectAvatar={imgname => {
          setInfo(info => ({
            ...info,
            avatar: imgname
          }));
        }}
      />
      <InputItem onChange={v => onChange("title", v)}>求职岗位</InputItem>
      <TextareaItem
        onChange={v => onChange("desc", v)}
        rows={3}
        autoHeight
        title="个人见解"
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
)(withRouter(Genius));
