import { APIResponse } from "../utils/tools.js";
import Feed from "../models/feed.js";
import sql from "../db/mysqlDatabase.js";
import { errorMessage, throwException } from "../utils/customException.js";

Feed.findAll = (req, res) => {
  sql.query("SELECT * FROM feed", (error: any, rows: any) => {
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

Feed.findByMnum = (req, res) => {
  sql.query(
    "SELECT * FROM feed WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!req.params.mnum.trim()) {
          throwException(errorMessage[422]("feed"), 422, false);
        } else if (rows.length === 0) {
          throwException(errorMessage[404]("feed"), 404, false);
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

Feed.findByFnum = (req, res) => {
  sql.query(
    "SELECT * FROM feed WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!req.params.fnum.trim()) {
          throwException(errorMessage[422]("feed"), 422, false);
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

Feed.create = (req, res) => {
  console.log(req.body);
  sql.query("INSERT INTO feed SET ?", req.body, (error: any, rows: any) => {
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

Feed.delete = (req, res) => {
  const { pnum } = req.params;
  const { mnum } = req.body;
  console.log(req.params);
  console.log(req.body);
  sql.query(
    "DELETE FROM feed WHERE pnum=? AND mnum=?",
    [pnum, mnum],
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (rows.affectedRows === 0) {
          throwException(errorMessage[404]("feed"), 404, false);
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

export default Feed;
