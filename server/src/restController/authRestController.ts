import router from "express";
import memberService from "../service/member.service.js";

const authRouter = router.Router();

// auth
authRouter.post("/auth/signin", (req: any, res: any) => {
  memberService.signin(req, res);
});
// auth
authRouter.post("/auth/signout", (req: any, res: any) => {
  memberService.signout(req, res);
});

export default authRouter;
