import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "@koa/bodyparser";

import { KOA_PORT } from "./config/config.js";
import { libraryLoad } from "./utils/musicManager.js";
import { dbInit } from "./utils/initDB.js";
import { routers } from "./routers/routes.js";

await libraryLoad("./Library/index.json");
await dbInit("./Library/index.json");

const app = new Koa();

// function isTokenValid(token) {
//   return token === 'your-valid-token';
// }

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser());

app.use(async (ctx, next) => {
  // 扩展一个设置cookie的方法
  let cookieArr = [];
  ctx.req.getCookie = function (key) {
    let cookies;
    let COOKIES = {};
    if (ctx.req.headers["cookie"]) {
      lcookies = ctx.req.headers["cookie"].trim();
      let Cookies = cookies.split(";");
      Cookies.forEach((item) => {
        let ITEM = item.replace(/=/, ":").split(":");
        COOKIES[ITEM[0]] = ITEM[1];
      });
    }
    return COOKIES;
  };
  ctx.res.setCookie = function (key, value, options = {}) {
    let args = [];
    options.domain && args.push(`domain=${options.domain}`);
    options.maxAge && args.push(`max-age=${options.maxAge}`);
    options.httpOnly && args.push(`httpOnly=${options.httpOnly}`);
    options.path && args.push(`path=${options.path}`);
    options.sameSite && args.push(`sameSite=${options.sameSite}`);
    options.secure && args.push(`secure=${options.secure}`);
    options.overwrite && args.push(`overwrite=${options.overwrite}`);

    cookieArr.push(`${key}=${value}; ${args.join("; ")}`);
    ctx.res.setHeader("Set-Cookie", cookieArr);
  };
  await next();
});
app.use(routers.routes());
app.listen(KOA_PORT, () => {
  console.log(`\nServer is running on port: ${KOA_PORT}`);
});
