import { APIResponse } from "../utils/tools.js";

import Product from "../models/product.js";
import sql from "../db/mysqlDatabase.js";
import {
  CustomException,
  errorMessage,
  throwException,
} from "../utils/customException.js";

Product.findAll = (req, res) => {
  sql.query("SELECT * FROM product", (error: any, rows: any) => {
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

Product.findOne = (req, res) => {
  const { num } = req.params;

  sql.query(
    "SELECT * FROM product WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (!num.trim()) {
          throwException(errorMessage[422]("product"), 422, false);
        } else if (!num.match(/^[\d]+$/)) {
          throwException(errorMessage[400]("product"), 400, false);
        } else if (rows.length === 0) {
          throwException(errorMessage[404]("product"), 404, false);
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

Product.create = (req, res) => {
  if (req.files && req.files[0]) {
    const cover = req.files[0];
    req.body.cover = cover.filename;
  }
  console.log(req.body);
  console.log(req.files);
  sql.query("INSERT INTO product SET ?", req.body, (error: any, rows: any) => {
    try {
      if (error) {
        throwException(errorMessage[500], 500, false);
      }

      res.json({
        ok: true,
        payload: rows,
      } as APIResponse);
    } catch (e: any) {
      res.status(400).json({
        ok: false,
        message: e.message || "잘못된 요청입니다.",
      });
    }
  });
};

Product.update = (req, res) => {
  sql.query(
    "UPDATE product SET ? WHERE ?",
    [req.body, req.params],
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (rows.affectedRows === 0) {
          throwException(errorMessage[404]("product"), 404, false);
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

Product.delete = (req, res) => {
  sql.query(
    "DELETE FROM product WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          throwException(errorMessage[500], 500, false);
        } else if (rows.affectedRows === 0) {
          throwException(errorMessage[404]("product"), 404, false);
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

export default Product;
