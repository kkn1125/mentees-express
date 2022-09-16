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
  sql.query(
    "SELECT * FROM comment order by `cnum` desc, `layer` asc, `order` desc",
    (err, rows) => {
      session.push(rows, "comment");
    }
  );

  // broadcast events
  setInterval(() => {
    sql.query("SELECT * FROM product", (err, rows) => {
      session.push(rows, "product");
    });
    sql.query("SELECT * FROM feedback", (err, rows) => {
      session.push(rows, "feedback");
    });
    sql.query(
      "SELECT * FROM comment order by `cnum` desc, `layer` asc, `order` desc",
      (err, rows) => {
        session.push(rows, "comment");
      }
    );
  }, 1000);
};

sseRouter.get("/broadcast", sse);

export default sseRouter;
