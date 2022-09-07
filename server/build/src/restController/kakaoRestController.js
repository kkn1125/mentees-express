import router from "express";
import { authorize, token, me, logout } from "../service/kakao.service.js";
const oauthRouter = router.Router();
oauthRouter.get("/oauth/authorize", (req, res) => {
    authorize(req, res);
});
oauthRouter.post("/oauth/token", (req, res) => {
    token(req, res);
});
oauthRouter.post("/v2/user/me", (req, res) => {
    me(req, res);
});
oauthRouter.post("/oauth/logout", (req, res) => {
    logout(req, res);
});
export default oauthRouter;
