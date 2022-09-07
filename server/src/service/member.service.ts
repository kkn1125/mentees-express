import { APIResponse } from "../utils/tools.js";
import bcrypt from "bcrypt";
import Member from "../models/member.js";
import sql from "../db/mysqlDatabase.js";
import jwtUtil from "../utils/jwt-util.js";
import { CustomException } from "../utils/customException.js";
const saltRounds = 10;

Member.signin = (req, res) => {
  const token = jwtUtil.sign({ email: req.body.email });
  const refreshToken = jwtUtil.refresh();
  sql.query(
    "SELECT * FROM member WHERE email=?",
    req.body.email,
    (err, rows) => {
      try {
        if (rows.length === 0) {
          throw new CustomException({
            message: "일치하는 회원 정보가 없습니다. 로그인을 다시 시도 해주세요.",
            status: 404,
            ok: false,
          });
        } else if (err) {
          throw new CustomException({
            message:
              "로그인 시도에서 문제가 발생했습니다. 새로고침 후 다시 시도해주세요.",
            status: 500,
            ok: false,
          });
        }
        bcrypt.compare(req.body.pw, rows[0].pw, (error, same) => {
          if (error) {
            throw new CustomException({
              message:
                "계정 정보가 일치하지 않습니다. 로그인을 다시 시도 해주세요.",
              status: 500,
              ok: false,
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
            throw new CustomException({
              message: "패스워드가 일치하지 않습니다.",
              status: 401,
              ok: false,
            });
          }
        });
      } catch (e: any) {
        res.status(e.status).json({
          status: e.status,
          ok: e.ok,
          message: e.message,
        });
      }
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
