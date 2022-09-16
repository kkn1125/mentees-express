import router from "express";
import feedbackService from "../service/feedback.service.js";

const feedbackRouter = router.Router();

feedbackRouter.get("/feedbacks", (req, res) => {
  feedbackService.findAll(req, res);
});

feedbackRouter.get("/feedbacks/:num", (req, res) => {
  feedbackService.findOne(req, res);
});

feedbackRouter.post("/feedbacks", (req, res) => {
  feedbackService.create(req, res);
});

feedbackRouter.put("/feedbacks/:num", (req, res) => {
  feedbackService.update(req, res);
});

feedbackRouter.delete("/feedbacks/:pnum", (req, res) => {
  feedbackService.delete(req, res);
});

export default feedbackRouter;
