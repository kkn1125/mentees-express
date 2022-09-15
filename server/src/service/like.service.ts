import { APIResponse } from "../utils/tools.js";
import Like from "../models/like.js";
import sql from "../db/mysqlDatabase.js";

Like.findAll = (req, res) => {
  sql.query("SELECT * FROM likes", (error: any, rows: any) => {
    try {
      if (error) {
        res.status(500).json({
          ok: false,
          message: error.message || "Not found likes",
        });
      }
      res.json({
        ok: true,
        payload: rows,
      } as APIResponse);
    } catch (e: any) {
      /** */
    }
  });
};

Like.findByMnum = (req, res) => {
  sql.query(
    "SELECT * FROM likes WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          res.status(500).json({
            ok: false,
            message: error.message,
          });
        } else if (!req.params.mnum.trim()) {
          res.status(400).json({ ok: false, message: "파라미터가 없습니다." });
        } else if (rows.length === 0) {
          res.status(404).json({
            ok: false,
            message: "좋아요 정보가 없습니다.",
          });
        }

        res.json({
          ok: true,
          payload: rows,
        } as APIResponse);
      } catch (e: any) {
        /** */
      }
    }
  );
};

Like.findByPnum = (req, res) => {
  const { pnum } = req.params;
  sql.query(
    "SELECT * FROM likes WHERE pnum=?",
    pnum,
    (error: any, rows: any) => {
      try {
        if (error) {
          res.status(500).json({
            ok: false,
            message: "서버에서 문제가 발생했습니다.",
          });
        } else if (!req.params.pnum.trim()) {
          res.status(400).json({ ok: false, message: "파라미터가 없습니다." });
        }

        res.json({
          ok: true,
          payload: rows,
        } as APIResponse);
      } catch (e: any) {
        // /** */
        // res.status(500).json({
        //   ok: false,
        //   message: "서버에서 문제가 발생했습니다.",
        // });
      }
    }
  );
};

Like.create = (req, res) => {
  sql.query("INSERT INTO likes SET ?", req.body, (error: any, rows: any) => {
    try {
      if (error) {
        res.status(500).json({
          ok: false,
          message: error.message || "Not found likes",
        });
      }

      res.json({
        ok: true,
        payload: rows,
      } as APIResponse);
    } catch (e: any) {
      res.status(500).json({
        ok: false,
        message: "서버에서 문제가 발생했습니다.",
      });
    }
  });
};

Like.delete = (req, res) => {
  const { pnum } = req.params;
  const { mnum } = req.body;
  console.log(req.params);
  console.log(req.body);
  sql.query(
    "DELETE FROM likes WHERE pnum=? AND mnum=?",
    [pnum, mnum],
    (error: any, rows: any) => {
      try {
        if (error) {
          res.status(400).json({
            ok: false,
            message: error.message || "Not found likes",
          });
        } else if (rows.affectedRows === 0) {
          res.status(404).json({
            ok: false,
            message: "좋아요 정보가 없습니다.",
          });
        }
        res.json({
          ok: true,
          payload: rows,
        } as APIResponse);
      } catch (e: any) {
        /** */
      }
    }
  );
};

export default Like;
