import SSE from "better-sse";
import router from "express";
import sql from "../db/mysqlDatabase.js";

const sseRouter = router.Router();

const EVENT_NAME = "broadcast";

const sse = async (req: any, res: any, headers: any) => {
  const session = await SSE.createSession(req, res, headers);
  sql.query("SELECT * FROM product", (err, rows) => {
    session.push(rows, EVENT_NAME);
  });
  setInterval(() => {
    sql.query("SELECT * FROM product", (err, rows) => {
      session.push(rows, EVENT_NAME);
    });
  }, 1000);
};

sseRouter.get("/broadcast", (req: any, res: any) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  sse(req, res, headers);
});

export default sseRouter;
