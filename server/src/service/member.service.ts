import { APIResponse } from "../utils/tools.js";
import bcrypt from "bcrypt";
import Member from "../models/member.js";
import sql from "../db/mysqlDatabase.js";
import jwtUtil from "../utils/jwt-util.js";
import {
  CustomException,
  errorMessage,
  throwException,
} from "../utils/customException.js";

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
          throwException(errorMessage.signin[404], 404, false);
        } else if (err) {
          throwException(errorMessage.signin[500], 500, false);
        }
        bcrypt.compare(req.body.pw, rows[0].pw, (error, same) => {
          if (error) {
            throwException(errorMessage.signin.compare, 500, false);
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
            throwException(errorMessage.signin.password, 401, false);
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

Member.fileUpload = (req, res) => {
  const { num } = req.body;
  const cover = req.files[0];

  sql.query(
    "UPDATE member SET cover=? WHERE num=?",
    [cover.filename, num],
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        }
        res.status(201).json({
          ok: true,
          payload: rows,
        } as APIResponse);
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
        throwException(errorMessage[500], 500, false);
      }
      res.json({
        ok: true,
        payload: rows,
      } as APIResponse);
    } catch (e: any) {
      res.status(e.status).json({
        status: e.status,
        ok: e.ok,
        message: e.message,
      });
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
          throwException(errorMessage[500], 500, false);
        } else if (!num.trim()) {
          throwException(errorMessage[422]("member"), 422, false);
        } else if (!num.match(/^[\d]+$/)) {
          throwException(errorMessage[400]("member"), 400, false);
        } else if (rows.length === 0) {
          throwException(errorMessage[404]("member"), 404, false);
        }

        res.json({
          ok: true,
          payload: rows,
        } as APIResponse);
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

Member.findById = (req, res) => {
  const { id } = req.params;

  sql.query(
    "SELECT * FROM member WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!id.trim()) {
          throwException(errorMessage[422]("member"), 422, false);
        } else if (rows.length === 0) {
          throwException(errorMessage[404]("member"), 404, false);
        }

        res.json({
          ok: true,
          payload: rows,
        } as APIResponse);
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

Member.create = (req, res) => {
  console.log(req.body);
  const { pw } = req.body;

  bcrypt.hash(pw, saltRounds, (err, hash) => {
    req.body.pw = hash;

    sql.query("INSERT INTO member SET ?", req.body, (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        }

        res.json({
          ok: true,
          payload: rows,
        } as APIResponse);
      } catch (e: any) {
        res.status(e.status).json({
          status: e.status,
          ok: e.ok,
          message: e.message,
        });
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
            throwException(errorMessage[500], 500, false);
          } else if (rows.affectedRows === 0) {
            throwException(errorMessage[404]("member"), 404, false);
          }
          res.status(201).json({
            ok: true,
            payload: rows,
          } as APIResponse);
        } catch (e: any) {
          res.status(e.status).json({
            status: e.status,
            ok: e.ok,
            message: e.message,
          });
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
          throwException(errorMessage[500], 500, false);
        } else if (rows.affectedRows === 0) {
          throwException(errorMessage[404]("member"), 404, false);
        }

        res.json({
          ok: true,
          payload: rows,
        } as APIResponse);
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

export default Member;
