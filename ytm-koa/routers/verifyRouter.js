import Router from "koa-router";
import CryptoJS from "crypto-js";
import { dbConnection } from "../models/models.js";
import { SECRET } from "../config/config.js";

const verifyRouter = new Router();

verifyRouter.prefix("/verify");

verifyRouter.post("/", async (ctx) => {
  const token = ctx.req.getCookie().token;
  if (!token) {
    ctx.status = 400;
    ctx.body = { status: 1, msg: "Name and secret are required." };
    return;
  }

  const decryptedBytes = CryptoJS.AES.decrypt(token, SECRET);
  const userName = decryptedBytes.toString(CryptoJS.enc.Utf8);

  const User = await dbConnection
    .collection("Users")
    .findOne({ name: userName });

  if (User) {
    ctx.body = { status: 1, msg: "OK" };
  }
});

export { verifyRouter };
