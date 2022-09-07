import { APIResponse } from "../utils/tools.js";

import bcrypt from "bcrypt";
import Member from "../models/member.js";
import sql from "../db/mysqlDatabase.js";
import jwtUtil from "../utils/jwt-util.js";
const saltRounds = 10;

Member.signin = (req, res) => {
  const token = jwtUtil.sign({ email: req.body.email });
  const refreshToken = jwtUtil.refresh();
  sql.query(
    "SELECT * FROM member WHERE email=?",
    req.body.email,
    (err, rows) => {
      bcrypt.compare(req.body.pw, rows[0].pw, (error, same) => {
        try {
          if (err) {
            res.status(404).json({
              ok: false,
              message: err.message,
            });
          }

          if (same) {
            const { pw, ...user } = rows[0];
            res.status(200).json({
              ok: true,
              payload: {
                token,
                refreshToken,
                user_num: user.num,
                user,
              },
            });
          } else {
            res.status(401).json({
              ok: false,
              message: "패스워드가 일치하지 않습니다.",
            });
          }
        } catch (e: any) {
          /** */
        }
      });
    }
  );
};

Member.findAll = (req, res) => {
  sql.query("SELECT * FROM member", (error: any, rows: any) => {
    try {
      if (error) {
        res.status(500).json({
          ok: false,
          message: error.message || "Not found members",
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

Member.findOne = (req, res) => {
  const { num } = req.params;

  sql.query(
    "SELECT * FROM member WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          res.status(500).json({
            ok: false,
            message: error.message,
          });
        } else if (!num.trim()) {
          res.status(400).json({ ok: false, message: "파라미터가 없습니다." });
        } else if (!num.match(/^[\d]+$/)) {
          res.status(400).json({
            ok: false,
            message: "파라미터 값이 잘못 되었습니다.",
          });
        } else if (rows.length === 0) {
          res.status(404).json({
            ok: false,
            message: "계정 정보가 없습니다.",
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

Member.findById = (req, res) => {
  const { id } = req.params;

  sql.query(
    "SELECT * FROM member WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          res.status(500).json({
            ok: false,
            message: error.message,
          });
        } else if (!id.trim()) {
          res.status(400).json({ ok: false, message: "파라미터가 없습니다." });
        } else if (rows.length === 0) {
          res.status(404).json({
            ok: false,
            message: "계정 정보가 없습니다.",
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

Member.create = (req, res) => {
  const { pw } = req.body;
  bcrypt.hash(pw, saltRounds, (err, hash) => {
    req.body.pw = hash;

    sql.query("INSERT INTO member SET ?", req.body, (error: any, rows: any) => {
      try {
        if (error) {
          res.status(500).json({
            ok: false,
            message: error.message || "Not found members",
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
  });
};

Member.update = (req, res) => {
  const { pw } = req.body;
  bcrypt.hash(pw, saltRounds, (err, hash) => {
    if (hash) {
      req.body.pw = hash;
    }

    sql.query(
      "UPDATE member SET ? WHERE ?",
      [req.body, req.params],
      (error: any, rows: any) => {
        try {
          if (error) {
            res.status(400).json({
              ok: false,
              message: error.message || "Not found members",
            });
          } else if (rows.affectedRows === 0) {
            res.status(404).json({
              ok: false,
              message: "계정 정보가 없습니다.",
            });
          }
          res.status(201).json({
            ok: true,
            payload: rows,
          } as APIResponse);
        } catch (e: any) {
          /** */
        }
      }
    );
  });
};

Member.delete = (req, res) => {
  sql.query(
    "DELETE FROM member WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          res.status(400).json({
            ok: false,
            message: error.message || "Not found members",
          });
        } else if (rows.affectedRows === 0) {
          res.status(404).json({
            ok: false,
            message: "계정 정보가 없습니다.",
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

export default Member;
