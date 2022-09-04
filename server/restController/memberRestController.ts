import router from "express";
import authJWT from "../middleware/authJWT.js";
import memberService from "../service/member.service.js";

const memberRouter = router.Router();

memberRouter.get("/members", (req: any, res: any) => {
  memberService.findAll(req, res);
});

memberRouter.get("/members/:num", (req: any, res: any) => {
  memberService.findOne(req, res);
});

memberRouter.post("/members", (req: any, res: any) => {
  memberService.create(req, res);
});

memberRouter.put("/members/:num", authJWT, (req: any, res: any) => {
  memberService.update(req, res);
});

memberRouter.delete("/members/:num", (req: any, res: any) => {
  memberService.delete(req, res);
});

export default memberRouter;
