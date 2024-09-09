import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "@koa/bodyparser";
import passport from "passport";

import { Strategy as loS } from "passport-local";

import { KOA_PORT } from "./config/config.js";
import { libraryLoad } from "./utils/musicManager.js";
import { dbInit } from "./utils/initDB.js";
import { routers } from "./routers/routes.js";

// await libraryLoad("./Library/index.json");
// await dbInit("./Library/index.json");

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(passport.initialize());
// passport.use(
//   "local",
//   new loS(
//     { passReqToCallback: true },
//     async (req, username, password, done) => {
//       console.log("local", username, password);
//       return done(null, { id: "test" });
//     }
//   )
// );
app.use(routers.routes());
app.listen(KOA_PORT, () => {
  console.log(`\nServer is running on port: ${KOA_PORT}`);
});
