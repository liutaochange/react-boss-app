import React from "react";
import logoImg from "Assets/images/job.png";
import style from "./style.module.css";
export default () => {
  return (
    <div className={style["logo-container"]}>
      <img src={logoImg} alt="" />
    </div>
  );
};
