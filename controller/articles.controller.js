const {
  fetchArticleById,
  fetchAllArticles,
  addCommentForArticle,
} = require("../models/articles.models");
const { checkArticleIdExists } = require("../models/comments.models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentForArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;
  checkArticleIdExists(article_id)
    .then(() => {
      return addCommentForArticle(article_id, body, username);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
