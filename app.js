const express = require("express");
const {
  getAllTopics,
  getAllEndpoints,
} = require("./controller/topics.controller");
const {
  getArticleById,
  getAllArticles,
  postCommentForArticle,
} = require("./controller/articles.controller");
const { getCommentsForArticle } = require("./controller/comments.controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getCommentsForArticle);

// app.post("/api/articles/:article_id/comments", postCommentForArticle);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: `${err.msg}` });
  }
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});
module.exports = app;
