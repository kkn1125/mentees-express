import router from "express";
import memberService from "../service/member.service.js";

const authRouter = router.Router();

// auth
authRouter.post("/auth/signin", (req, res) => {
  memberService.signin(req, res);
});
// auth
authRouter.post("/auth/signout", (req, res) => {
  memberService.signout(req, res);
});

export default authRouter;
