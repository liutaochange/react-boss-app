const Router = require("koa-router");
const router = new Router();
const mongoose = require("mongoose");
const userModel = mongoose.model("user");
const { sign } = require("jsonwebtoken");
const screct = "react-boss-app";
const jwt = require("koa-jwt")({ screct });
router.post("/register", async ctx => {
  const userInfo = ctx.request.body;
  if (userInfo && userInfo.user && userInfo.password && userInfo.type) {
    let { user } = userInfo;
    let result = await userModel.findOne({ name: user }).exec();
    if (!result) {
      // 生成token, secret作为密钥，expiresIn为失效时间，看情况，一般也不会太久
      const token = sign({ user }, screct, { expiresIn: "5h" });
      let newUser = new userModel({
        ...userInfo,
        name: user,
        token
      });
      let response = await newUser
        .save()
        .then(res => {
          return {
            code: 0,
            data: res
          };
        })
        .catch(err => {
          console.log(err);
          return {
            code: 1,
            msg: "注册失败，请重试"
          };
        });
      ctx.body = response;
    } else {
      ctx.body = {
        code: 1,
        msg: "用户名已被占用，请重新输入"
      };
    }
  } else {
    ctx.body = {
      code: 1,
      msg: "请求参数错误"
    };
  }
});

router.post("/login", async ctx => {
  const user = ctx.request.body;
  if (user && user.user && user.password && user.type) {
    let { user, password, type } = user;
    // 生成token, secret作为密钥，expiresIn为失效时间，看情况，一般也不会太久
    const token = sign({ user }, screct, { expiresIn: "5h" });
  }
  let response;
  await model
    .find()
    .exec()
    .then(res => {
      if (!res[0].name) {
        response = JSON.stringify({
          code: 1,
          msg: "获取用户信息失败"
        });
      } else {
        response = JSON.stringify({
          code: 0,
          msg: "获取用户信息成功",
          data: res
        });
      }
    });
  ctx.body = response;
});
module.exports = router;
