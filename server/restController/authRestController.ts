import router from "express";
import memberService from "../service/member.service.js";

const authRouter = router.Router();

// auth
authRouter.post("/auth/signin", (req: any, res: any) => {
  memberService.signin(req, res);
});

export default authRouter;
