import Router from "koa-router";
import { dbConnection } from "../models/models.js";
import {
  getTrackImage,
  getTrackName,
} from "../controllers/metadataController.js";

const metadataRouter = new Router();

metadataRouter.prefix("/metadata");
metadataRouter.get("/playlists", async (ctx) => {
  try {
    const Playlists = dbConnection.collection("Playlists");
    const playlists = await Playlists.find().toArray();
    playlists.map(async (playlist) => {
      playlist.cover = await getTrackImage({ pid: playlist.pid });
    });

    ctx.status = 200;
    ctx.body = { status: 0, playlists };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { status: 1, msg: "Internal Server Error" };
  }
});
metadataRouter.get("/image", async (ctx) => {
  const { pid, trackid } = ctx.query;
  const image = await getTrackImage({ pid, trackid });
  if (!image) {
    ctx.status = 404;
    return;
  }
  ctx.set("Content-Type", "image/jpeg");
  ctx.body = image;
});

metadataRouter.get("/playlist", async (ctx) => {
  try {
    const { pid } = ctx.query;
    const Playlist = dbConnection.collection(`p_${pid}`);
    const tracks = await Playlist.find().toArray();
    const trackids = tracks.map((track) => track.tid);
    const Library = dbConnection.collection("Libraries");
    const playlist = await Library.find({
      trackid: { $in: trackids },
    }).toArray();

    const promises = playlist.map((track) => {
      return Library.findOne({ trackid: track.tid });
    });
    await Promise.all(promises);
    const image = await getTrackImage({ pid: pid });
    ctx.status = 200;
    ctx.body = { status: 0, playlist, image };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { status: 1, msg: "Internal Server Error" };
  }
});

export { metadataRouter };
