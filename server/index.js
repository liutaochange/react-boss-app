const Koa = require("koa");
const Router = require("koa-router"); // 引入路由中间件
const bodyParser = require("koa-bodyparser");
const koajwt = require("koa-jwt");
const app = new Koa();
app.use(bodyParser());
const router = new Router(); // 实例化路由
const mongoose = require("./mongoose/index"); // 引入mongoose
// 创建连接
mongoose.connection.on("connected", () => {
  console.log("connect success");
});
// 引入schema
require("./mongoose/schema/index");
// 错误处理, 
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 200;
      ctx.body = {
        code: 2,
        msg: 'token 失效，请重新登录'
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '系统异常'
      };
    }
  });
});

// token 验证失败的时候会抛出401错误，因此需要添加错误处理，而且要放在 app.use(koajwt()) 之前，否则不执行
app.use(
  koajwt({
    secret: "react-boss-app"
  }).unless({
    path: [/\/user\/login/, /\/user\/register/]
  })
);
// 路由模块化 用户信息
const user = require("./router/user.js");
router.use("/user", user.routes(), user.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(5566);
