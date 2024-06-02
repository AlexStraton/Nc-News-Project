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
const {
  getAllUsers,
  getUserByUsername,
} = require("./controller/users.controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics); //y
app.get("/api", getAllEndpoints); //y
app.get("/api/articles/:article_id", getArticleById); //y
app.get("/api/articles", getAllArticles); //y
app.get("/api/articles/:article_id/comments", getCommentsForArticle); //y
app.get("/api/users", getAllUsers);

app.get("/api/users/:username", getUserByUsername);

app.post("/api/articles/:article_id/comments", postCommentForArticle); //y

app.patch("/api/articles/:article_id", patchArticleById); //y

app.delete("/api/comments/:comment_id", deleteByCommentId); //y

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: `${err.msg}` });
  } else {
    next(err);
  }
});

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
