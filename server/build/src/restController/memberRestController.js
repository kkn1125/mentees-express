import router from "express";
import authJWT from "../middleware/authJWT.js";
import memberService from "../service/member.service.js";
const memberRouter = router.Router();
memberRouter.get("/members", (req, res) => {
    memberService.findAll(req, res);
});
memberRouter.get("/members/:num", (req, res) => {
    memberService.findOne(req, res);
});
memberRouter.get("/members/id/:id", (req, res) => {
    memberService.findById(req, res);
});
memberRouter.post("/members", (req, res) => {
    memberService.create(req, res);
});
memberRouter.put("/members/:num", authJWT, (req, res) => {
    memberService.update(req, res);
});
memberRouter.delete("/members/:num", (req, res) => {
    memberService.delete(req, res);
});
export default memberRouter;
