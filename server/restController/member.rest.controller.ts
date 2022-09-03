const memberRouter = require("express").Router();
const memberService = require("../service/member.service");

memberRouter.get("/members", (req: any, res: any) => {
  memberService.findAll(req, res);
});

module.exports = memberRouter;
