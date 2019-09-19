import React, { useEffect } from "react";
import { NavBar, Button, Toast } from "antd-mobile";
import NavLinkBar from "Components/tabbar/index";
import { connect } from "react-redux";
import { getUserList } from "@/api/index";
const GeniusList = props => {
  useEffect(() => {
    getUserList('genius').then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  }, []);
  return (
    <div>
      <NavBar className="fixd-header" mode="dard">
        牛人列表
      </NavBar>
      <div style={{ marginTop: 45 }}></div>

      <NavLinkBar></NavLinkBar>
    </div>
  );
};

export default GeniusList;
