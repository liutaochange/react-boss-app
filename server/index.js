const Koa = require("koa");
const Router = require("koa-router"); // 引入路由中间件
const app = new Koa();
const router = new Router(); // 实例化路由

router.get("/api/userInfo", async ctx => {
  console.log(ctx);
  ctx.body = JSON.stringify({
    code: "0",
    data: {
      name: "web"
    }
  });
});

app.use(router.routes());

app.listen(5566);
