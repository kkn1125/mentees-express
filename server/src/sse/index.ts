import SSE from "better-sse";
import router from "express";
import sql from "../db/mysqlDatabase.js";

const sseRouter = router.Router();

const headers: any = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};

const sse = async (req: any, res: any) => {
  const session = await SSE.createSession(req, res, headers);
  sql.query("SELECT * FROM product", (err, rows) => {
    session.push(rows, "product");
  });
  sql.query("SELECT * FROM feedback", (err, rows) => {
    session.push(rows, "feedback");
  });
  setInterval(() => {
    sql.query("SELECT * FROM product", (err, rows) => {
      session.push(rows, "product");
    });
    sql.query("SELECT * FROM feedback", (err, rows) => {
      session.push(rows, "feedback");
    });
  }, 1000);
};

sseRouter.get("/broadcast", sse);

export default sseRouter;
