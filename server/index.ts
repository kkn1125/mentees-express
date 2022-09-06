process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() == "production"
    ? "production"
    : "development";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./src/restController/authRestController.js";
import memberRouter from "./src/restController/memberRestController.js";
import productRouter from "./src/restController/productRestController.js";
import oauthRouter from "./src/restController/kakaoRestController.js";
import sseRouter from "./src/sse/index.js";

dotenv.config();

const { PORT, HOST } = process.env;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get(/^(?!\/(api|sse)).+/, (req: any, res: any) => {
    res.send(
      express.static(path.join(__dirname, "../client/build/index.html"))
    );
  });
} else {
  app.get(/^(?!\/(api|sse)).+/, (req: any, res: any) => {
    res.send("now is development");
  });
}

// member restController
app.use("/api", authRouter);
app.use("/api", memberRouter);
app.use("/api", productRouter);
app.use("/api/k", oauthRouter);

app.use("/sse", sseRouter);

app.listen(PORT, () => {
  console.debug(`app listening on port http://${HOST}:${PORT}`);
});
