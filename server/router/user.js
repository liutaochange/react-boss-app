const Router = require("koa-router");
const router = new Router();
const mongoose = require("mongoose");
const userModel = mongoose.model("user");
const jwt = require("jsonwebtoken");
const screct = "react-boss-app";
// 用户注册
router.post("/register", async ctx => {
  const userInfo = ctx.request.body;
  if (userInfo && userInfo.user && userInfo.password && userInfo.type) {
    let { user } = userInfo;
    let result = await userModel.findOne({ name: user }).exec();
    if (!result) {
      // 生成token, secret作为密钥，expiresIn为失效时间，看情况，一般也不会太久
      const token = jwt.sign({ user }, screct, { expiresIn: "5h" });
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
            data: {
              user,
              type: res.type,
              token: res.token
            }
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
// 用户登录
router.post("/login", async ctx => {
  const userInfo = ctx.request.body;
  if (userInfo && userInfo.user && userInfo.password) {
    let { user, password } = userInfo;
    let result = await userModel.findOne({ name: user }).exec();
    if (result && result.name === user) {
      let newUserModel = new userModel();
      let isMatch = await newUserModel.comparePassword(
        password,
        result.password
      );
      if (isMatch) {
        // 生成token, secret作为密钥，expiresIn为失效时间，看情况，一般也不会太久
        const token = jwt.sign({ user }, screct, { expiresIn: "5h" });
        await userModel.findOneAndUpdate({ name: user }, { token }).exec();
        ctx.body = {
          code: 0,
          data: {
            user: user,
            type: result.type,
            avatar: result.avatar,
            token
          },
          msg: "登录成功"
        };
      } else {
        ctx.body = {
          code: 1,
          data: {},
          msg: "用户密码不匹配"
        };
      }
    } else {
      ctx.body = {
        code: 1,
        msg: "用户名和账号不匹配",
        data: {}
      };
    }
  } else {
    ctx.body = {
      code: 1,
      msg: "请求参数错误"
    };
  }
});
// 完善用户信息
router.post("/update", async ctx => {
  const userInfo = ctx.request.body;
  if (userInfo && userInfo.user && userInfo.type) {
    let { user } = userInfo;
    let result = await userModel.findOne({ name: user }).exec();
    if (result && result.name === user) {
      let updateInfo = {};
      if (userInfo.type === "genius") {
        updateInfo = {
          title: userInfo.title,
          desc: userInfo.desc,
          avatar: userInfo.avatar
        };
      } else {
        updateInfo = {
          title: userInfo.title,
          desc: userInfo.desc,
          avatar: userInfo.avatar,
          company: userInfo.company,
          money: userInfo.money
        };
      }
      // new：bool – 如果为true，返回修改后的文档而不是原始文档。默认为false
      let res = await userModel
        .findOneAndUpdate({ name: user }, updateInfo, { new: true })
        .exec();
      if (res.type === "genius") {
        ctx.body = {
          code: 0,
          data: {
            user: user,
            type: res.type,
            token: res.token,
            title: res.title,
            desc: res.desc,
            avatar: res.avatar
          },
          msg: "更新成功"
        };
      } else {
        ctx.body = {
          code: 0,
          data: {
            user: user,
            type: res.type,
            token: res.token,
            title: res.title,
            desc: res.desc,
            company: res.company,
            money: res.money,
            avatar: res.avatar
          },
          msg: "更新成功"
        };
      }
    } else {
      ctx.body = {
        code: 1,
        msg: "用户不存在",
        data: {}
      };
    }
  } else {
    ctx.body = {
      code: 1,
      msg: "请求参数错误"
    };
  }
});
// 获取用户列表
router.post("/list", async ctx => {
  const { type } = ctx.request.body;
  let result = await userModel.find({ type: type }).exec();
  if (result) {
    ctx.body = {
      code: 0,
      data: result,
      msg: "查询成功"
    };
  } else {
    ctx.body = {
      code: 1,
      data: [],
      msg: "查询失败"
    };
  }
});
module.exports = router;
