import router from "express";
import commentService from "../service/comment.service.js";

const commentRouter = router.Router();

commentRouter.get("/comments", (req, res) => {
  commentService.findAll(req, res);
});

commentRouter.get("/comments/:num", (req, res) => {
  commentService.findOne(req, res);
});

commentRouter.get("/comments/pnum/:pnum", (req, res) => {
  commentService.findByPnum(req, res);
});

commentRouter.get("/comments/fnum/:fnum", (req, res) => {
  commentService.findByFnum(req, res);
});

commentRouter.post("/comments", (req, res) => {
  commentService.create(req, res);
});

commentRouter.put("/comments/:num", (req, res) => {
  commentService.update(req, res);
});

commentRouter.delete("/comments/:num", (req, res) => {
  commentService.delete(req, res);
});

export default commentRouter;
