const express = require("express");
const {
  getAllTopics,
  getAllEndpoints,
} = require("./controller/topics.controller");
const { getArticleById } = require("./controller/articles.controller");

const app = express();

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndpoints);
app.get("/api/articles/:article_id", getArticleById);

app.use((err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next();
});
app.use((err, req, res, next) => {
  if (err.code) {
    res.status(404).send({ msg: "Not Found" });
  }
  next();
});

app.use((err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ msg: "Bad Request" });
  }
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});
module.exports = app;
