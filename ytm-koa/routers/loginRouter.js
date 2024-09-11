import Router from "koa-router";
import CryptoJS from "crypto-js";
import { dbConnection } from "../models/models.js";
import { decrypt, encrypt } from "../middlewares/secret.js";

const loginRouter = new Router();

loginRouter.prefix("/login");

loginRouter.post("/", async (ctx) => {
  try {
    const { name, secret } = ctx.request.body;

    if (!name || !secret) {
      ctx.status = 400;
      ctx.body = { status: 1, msg: "Name and secret are required." };
      return;
    }

    const decrypted = secret;

    const User = dbConnection.collection("Users");
    const user = await User.findOne({ name: name, secret: decrypted });

    if (user) {
      const secretKey = "Google2024Summer";
      const key = CryptoJS.AES.encrypt(name, secretKey).toString();
      const value = CryptoJS.AES.encrypt(secret, secretKey).toString();
      ctx.status = 200;
      ctx.body = { status: 0, msg: "Success" };
      ctx.res.setCookie("token", key, {
        maxAge: 1000 * 60 * 60 * 24, // 24小时过期
        httpOnly: false,
        overwrite: true, // 覆盖已经存在的cookie
        sameSite: "None",
        secure: true,
      });
    } else {
      ctx.status = 401;
      ctx.body = { status: 1, msg: "Username or Password error." };
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { status: 1, msg: "Internal Server Error" };
  }
});

export { loginRouter };
