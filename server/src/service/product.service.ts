import { APIResponse } from "../utils/tools.js";

import Product from "../models/product.js";
import sql from "../db/mysqlDatabase.js";

Product.findAll = (req, res) => {
  sql.query("SELECT * FROM product", (error: any, rows: any) => {
    try {
      if (error) {
        res.status(500).json({
          ok: false,
          message: error.message || "Not found products",
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

Product.findOne = (req, res) => {
  const { num } = req.params;

  sql.query(
    "SELECT * FROM product WHERE ?",
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
            message: "상품 정보가 없습니다.",
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

Product.create = (req, res) => {
  sql.query("INSERT INTO product SET ?", req.body, (error: any, rows: any) => {
    try {
      if (error) {
        res.status(500).json({
          ok: false,
          message: error.message || "Not found products",
        });
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
          res.status(400).json({
            ok: false,
            message: error.message || "Not found products",
          });
        } else if (rows.affectedRows === 0) {
          res.status(404).json({
            ok: false,
            message: "상품 정보가 없습니다.",
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
};

Product.delete = (req, res) => {
  sql.query(
    "DELETE FROM product WHERE ?",
    req.params,
    (error: any, rows: any) => {
      try {
        if (error) {
          res.status(400).json({
            ok: false,
            message: error.message || "Not found products",
          });
        } else if (rows.affectedRows === 0) {
          res.status(404).json({
            ok: false,
            message: "상품 정보가 없습니다.",
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

export default Product;
