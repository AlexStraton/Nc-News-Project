const express = require("express");
const {
  getAllTopics,
  getAllEndpoints,
} = require("./controller/topics.controller");

const app = express();

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndpoints);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});
module.exports = app;
