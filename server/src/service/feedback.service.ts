import { APIResponse } from "../utils/tools.js";

import Feedback from "../models/feedback.js";
import sql from "../db/mysqlDatabase.js";
import { errorMessage, throwException } from "../utils/customException.js";

Feedback.findAll = (req, res) => {
  sql.query("SELECT * FROM feedback", (error: any, rows: any) => {
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

Feedback.findOne = (req, res) => {
  const { num } = req.params;

  sql.query(
    "SELECT * FROM feedback WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!num.trim()) {
          throwException(errorMessage[422]("feedback"), 422, false);
        } else if (!num.match(/^[\d]+$/)) {
          throwException(errorMessage[400]("feedback"), 400, false);
        } else if (rows.length === 0) {
          throwException(errorMessage[404]("feedback"), 404, false);
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

Feedback.create = (req, res) => {
  sql.query("INSERT INTO feedback SET ?", req.body, (error: any, rows: any) => {
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

Feedback.update = (req, res) => {
  sql.query(
    "UPDATE feedback SET ? WHERE ?",
    [req.body, req.params],
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (rows.affectedRows === 0) {
          throwException(errorMessage[404]("feedback"), 404, false);
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

Feedback.delete = (req, res) => {
  sql.query(
    "DELETE FROM feedback WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (rows.affectedRows === 0) {
          throwException(errorMessage[404]("feedback"), 404, false);
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

export default Feedback;
