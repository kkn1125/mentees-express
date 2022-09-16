process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() === "production"
    ? "production"
    : "development";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./src/restController/authRestController.js";
import commentRouter from "./src/restController/commentRestController.js";
import feedbackRouter from "./src/restController/feedbackRestController.js";
import feedRouter from "./src/restController/feedRestController.js";
import oauthRouter from "./src/restController/kakaoRestController.js";
import likeRouter from "./src/restController/likeRestController.js";
import memberRouter from "./src/restController/memberRestController.js";
import productRouter from "./src/restController/productRestController.js";
import sseRouter from "./src/sse/index.js";

const { PORT, HOST } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
  destination: (req, file, cb) => {
    cb(
      null,
      __dirname +
        (process.env.NODE_ENV === "production" ? "" : "/../client/") +
        "public/uploads/"
    );
  },
});
const upload = multer({ storage });

dotenv.config({
  path: __dirname + ".env",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  console.debug(process.env.NODE_ENV);
  app.use("/resources", express.static(path.join(__dirname, "../public")));
  app.use(express.static(path.join(__dirname, "front/")));
  app.get(/^(?!\/(api|sse)).+/, (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "front/index.html"));
  });
} else {
  console.debug(process.env.NODE_ENV);
  app.get(/^(?!\/(api|sse)).+/, (req: any, res: any) => {
    res.send("now is development");
  });
}

// multer middleware
app.use(upload.any());

// member restController
app.use("/api", authRouter);
app.use("/api", memberRouter);
app.use("/api", productRouter);
app.use("/api", likeRouter);
app.use("/api", feedbackRouter);
app.use("/api", feedRouter);
app.use("/api", commentRouter);
app.use("/api/k", oauthRouter);

app.use("/sse", sseRouter);

app.listen(PORT, () => {
  console.debug(`app listening on port http://${HOST}:${PORT}`);
});
