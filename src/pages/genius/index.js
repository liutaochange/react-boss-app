import React, { useState } from "react";
import { NavBar, InputItem, TextareaItem, Button, Toast } from "antd-mobile";
import AvatarSelector from "Components/avator/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { update } from "@/api/index";
import Store from "Assets/js/utils";
const Genius = props => {
  if (!props.isLogin) {
    props.history.push("login.html");
  }
  let [info, setInfo] = useState({
    title: "",
    desc: "",
    avatar: "",
    ...props.info
  });
  const onChange = (key, val) => {
    setInfo(info => ({
      ...info,
      [key]: val
    }));
  };
  const handleSubmit = () => {
    if (info.desc === "" || info.title === "") {
      Toast.info("请填写完整信息", 1);
      return
    }
    update(info)
      .then(res => {
        if (res.data.code === 0) {
          Store.set("__USER_INFO__", res.data.data);
          Toast.info("保存成功", 1);
          setTimeout(() => {
            props.history.push("geniusList.html");
          }, 1000);
        } else {
          Toast.info(res.dada.msg, 1);
        }
      })
      .catch(err => {
        console.log(err);
        Toast.info("系统异常，请重试", 1);
      });
  };
  return (
    <div>
      <NavBar mode="dark">牛人完善信息页</NavBar>
      <AvatarSelector
        icon={info.avatar || ""}
        selectAvatar={imgname => {
          setInfo(info => ({
            ...info,
            avatar: imgname
          }));
        }}
      />
      <InputItem value={info.title || ""} onChange={v => onChange("title", v)}>
        求职岗位
      </InputItem>
      <TextareaItem
        value={info.desc || ""}
        onChange={v => onChange("desc", v)}
        rows={3}
        autoHeight
        title="个人见解"
      />
      <Button
        onClick={() => {
          handleSubmit();
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
export default connect(
  mapStateToProps,
  null
)(withRouter(Genius));
