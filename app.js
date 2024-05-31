const express = require("express");
const {
  getAllTopics,
  getAllEndpoints,
} = require("./controller/topics.controller");
const {
  getArticleById,
  getAllArticles,
  postCommentForArticle,
  patchArticleById,
} = require("./controller/articles.controller");
const {
  getCommentsForArticle,
  deleteByCommentId,
} = require("./controller/comments.controller");
const { getAllUsers } = require("./controller/users.controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getCommentsForArticle);
app.get("/api/users", getAllUsers);

app.post("/api/articles/:article_id/comments", postCommentForArticle);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteByCommentId);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  }
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: `${err.msg}` });
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});
module.exports = app;
