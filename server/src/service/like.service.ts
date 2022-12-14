import { APIResponse } from "../utils/tools.js";
import Like from "../models/like.js";
import sql from "../db/mysqlDatabase.js";
import { errorMessage, throwException } from "../utils/customException.js";

Like.findAll = (req, res) => {
  sql.query("SELECT * FROM likes", (error: any, rows: any) => {
    try {
      if (error) {
        throwException(errorMessage[500], 500, false);
      }

      res.status(200).json({
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

Like.findByMnum = (req, res) => {
  sql.query(
    "SELECT * FROM likes WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!req.params.mnum.trim()) {
          throwException(errorMessage[422]("like"), 422, false);
        } else if (rows.length === 0) {
          throwException(errorMessage[404]("like"), 404, false);
        }

        res.status(200).json({
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

Like.findByPnum = (req, res) => {
  const { pnum } = req.params;
  sql.query(
    "SELECT * FROM likes WHERE pnum=?",
    pnum,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!req.params.pnum.trim()) {
          throwException(errorMessage[422]("like"), 422, false);
        }

        res.status(200).json({
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

Like.create = (req, res) => {
  sql.query("INSERT INTO likes SET ?", req.body, (error: any, rows: any) => {
    try {
      if (error) {
        throwException(errorMessage[500], 500, false);
      }

      res.status(200).json({
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

Like.delete = (req, res) => {
  const { pnum } = req.params;
  const { mnum } = req.body;
  sql.query(
    "DELETE FROM likes WHERE pnum=? AND mnum=?",
    [pnum, mnum],
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (rows.affectedRows === 0) {
          throwException(errorMessage[404]("like"), 404, false);
        }

        res.status(200).json({
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

export default Like;
