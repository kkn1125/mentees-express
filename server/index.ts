const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const members = require("./restController/member.rest.controller");
const db = require("./db/mysqlDatabase");

require("dotenv").config();

const { PORT, HOST } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// member restController
app.use("/api", members);

app.listen(PORT, () => {
  console.log(`app listening on port http://${HOST}:${PORT}`);
});
