import router from "express";
import authJWT from "../middleware/authJWT.js";
import likeService from "../service/like.service.js";

const likeRouter = router.Router();

likeRouter.get("/likes", (req, res) => {
  likeService.findAll(req, res);
});

likeRouter.get("/likes/pnum/:pnum", (req, res) => {
  likeService.findByPnum(req, res);
});

likeRouter.get("/likes/mnum/:mnum", (req, res) => {
  likeService.findByMnum(req, res);
});

likeRouter.post("/likes", (req, res) => {
  likeService.create(req, res);
});

likeRouter.delete("/likes/:pnum", (req, res) => {
  likeService.delete(req, res);
});

export default likeRouter;
