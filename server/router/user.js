const Router = require("koa-router");
const router = new Router();
const mongoose = require("mongoose");
const model = mongoose.model("user");
const userInfo = {
  name: "Trank",
  work: "js",
  age: "20"
};
router.get("/register", async ctx => {
  let newUser = new model(userInfo);
  let response;
  await newUser
    .save()
    .then(res => {
      if (!res.name) {
        response = JSON.stringify({
          code: 1,
          msg: "添加用户失败"
        });
      } else {
        response = JSON.stringify({
          code: 0,
          msg: "添加用户成功"
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  ctx.body = response;
});

router.get("/login", async ctx => {
  let response;
  await model.find().exec().then((res) => {
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
