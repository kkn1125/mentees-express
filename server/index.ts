import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./restController/authRestController.js";
import memberRouter from "./restController/memberRestController.js";

dotenv.config();

const { PORT, HOST } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// member restController
app.use("/api", memberRouter);
app.use("/api", authRouter);

app.listen(PORT, () => {
  console.debug(`app listening on port http://${HOST}:${PORT}`);
});
