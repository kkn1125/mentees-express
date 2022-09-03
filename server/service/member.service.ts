import { APIResponse } from "../utils/tools";

const sql = require("../db/mysqlDatabase");
const Member = require("../models/member");

Member.findAll = (req: any, res: any) => {
  sql.query("SELECT * FROM member", (error: any, rows: any) => {
    if (error) {
      console.log(error.message);
      res.status(404).json({
        fail: true,
        message: error.message || "Not found members",
      });
    }
    res.json({
      ok: true,
      payload: rows,
    } as APIResponse);
  });
};

module.exports = Member;
