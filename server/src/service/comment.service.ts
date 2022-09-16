import { APIResponse } from "../utils/tools.js";

import Comment from "../models/comment.js";
import sql from "../db/mysqlDatabase.js";
import { errorMessage, throwException } from "../utils/customException.js";

Comment.findAll = (req, res) => {
  sql.query("SELECT * FROM comment", (error: any, rows: any) => {
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

Comment.findOne = (req, res) => {
  sql.query(
    "SELECT * FROM comment WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!req.params.num.trim()) {
          throwException(errorMessage[422]("comment"), 422, false);
        } else if (!req.params.num.match(/^[\d]+$/)) {
          throwException(errorMessage[400]("comment"), 400, false);
        } else if (rows.length === 0) {
          throwException(errorMessage[404]("comment"), 404, false);
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

Comment.findByPnum = (req, res) => {
  sql.query(
    "SELECT * FROM comment WHERE ? AND type='product'",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!req.params.pnum.trim()) {
          throwException(errorMessage[422]("comment"), 422, false);
        } else if (!req.params.pnum.match(/^[\d]+$/)) {
          throwException(errorMessage[400]("comment"), 400, false);
        } else if (rows.length === 0) {
          throwException(errorMessage[404]("comment"), 404, false);
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

Comment.findByFnum = (req, res) => {
  sql.query(
    "SELECT * FROM comment WHERE ? AND type='feedback'",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!req.params.pnum.trim()) {
          throwException(errorMessage[422]("comment"), 422, false);
        } else if (!req.params.pnum.match(/^[\d]+$/)) {
          throwException(errorMessage[400]("comment"), 400, false);
        } else if (rows.length === 0) {
          throwException(errorMessage[404]("comment"), 404, false);
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

Comment.create = (req, res) => {
  sql.query("INSERT INTO comment SET ?", req.body, (error: any, rows: any) => {
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

Comment.update = (req, res) => {
  sql.query(
    "UPDATE comment SET ? WHERE ?",
    [req.body, req.params],
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (rows.affectedRows === 0) {
          throwException(errorMessage[404]("comment"), 404, false);
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

Comment.delete = (req, res) => {
  sql.query(
    "DELETE FROM comment WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (rows.affectedRows === 0) {
          throwException(errorMessage[404]("comment"), 404, false);
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

export default Comment;
