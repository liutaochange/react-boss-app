import React, { useState } from "react";
import { Grid, List } from "antd-mobile";

const AvatarSelector = props => {
  const avatarList = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
    .split(",")
    .map(v => ({
      icon: require(`Assets/images/avatar/${v}.png`),
      text: v
    }));
  let [info, setInfo] = useState({
    icon: require(`Assets/images/avatar/${props.icon || 'boy'}.png`)
  });
  const gridHeader = info && info.icon ? (
    <div>
      <span>已选择头像</span>
      <img style={{ width: 20 }} src={info.icon} alt="" />
    </div>
  ) : (
    "请选择头像"
  );
  return (
    <div>
      <List renderHeader={() => gridHeader}>
        <Grid
          data={avatarList}
          columnNum={5}
          onClick={elm => {
            setInfo(elm);
            props.selectAvatar(elm.text);
          }}
        />
      </List>
    </div>
  );
};

export default AvatarSelector;
