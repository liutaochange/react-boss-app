const Koa = require("koa");
const Router = require("koa-router"); // 引入路由中间件
const bodyParser = require('koa-bodyparser'); 
const app = new Koa();
app.use(bodyParser());
const router = new Router(); // 实例化路由
const mongoose = require("./mongoose/index"); // 引入mongoose
// 创建连接
mongoose.connection.on("connected", () => {
  console.log("connect success");
});
// 引入schema
require('./mongoose/schema/index')
// 路由模块化 用户信息
const user = require('./router/user.js');
router.use('/user', user.routes(), user.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(5566);
