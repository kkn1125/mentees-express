import router from "express";
import feedService from "../service/feed.service.js";

const feedRouter = router.Router();

feedRouter.get("/feeds", (req, res) => {
  feedService.findAll(req, res);
});

feedRouter.get("/feeds/fnum/:fnum", (req, res) => {
  feedService.findByFnum(req, res);
});

feedRouter.get("/feeds/mnum/:mnum", (req, res) => {
  feedService.findByMnum(req, res);
});

feedRouter.post("/feeds", (req, res) => {
  feedService.create(req, res);
});

feedRouter.delete("/feeds/:pnum", (req, res) => {
  feedService.delete(req, res);
});

export default feedRouter;
