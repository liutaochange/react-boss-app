import React, { useState } from "react";
import { NavBar, InputItem, TextareaItem, Button, Toast } from "antd-mobile";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AvatarSelector from "Components/avator/index";
import { update } from "@/api/index";
import Store from "Assets/js/utils";
const Boss = props => {
  if (!props.isLogin) {
    props.history.push("login.html");
  }
  let [info, setInfo] = useState({
    title: "",
    desc: "",
    company: "",
    money: "",
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
    if (info.company === "" || info.title === "" || info.money === "") {
      Toast.info("请填写完整信息", 1);
      return
    }
    update(info)
      .then(res => {
        if (res.data.code === 0) {
          Store.set("__USER_INFO__", res.data.data);
          Toast.info("保存成功", 1);
          setTimeout(() => {
            props.history.push("bossList.html");
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
)(withRouter(Boss));
