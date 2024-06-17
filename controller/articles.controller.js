const {
  fetchArticleById,
  fetchAllArticles,
  addCommentForArticle,
  insertVotes,
  checkTopicExists,
  addNewArticle,
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
  const { topic } = req.query;
  const { sort_by } = req.query;
  const { order } = req.query;
  // const { limit } = req.query;
  // const { p } = req.query;

  checkTopicExists(topic)
    .then(() => {
      return fetchAllArticles(topic, sort_by, order);
    })
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

  if (!body) {
    res.status(400).send({ msg: "Bad Request" });
  }
  checkArticleIdExists(article_id)
    .then(() => {
      return addCommentForArticle(article_id, username, body);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  checkArticleIdExists(article_id)
    .then(() => {
      return insertVotes(article_id, inc_votes);
    })
    .then((response) => {
      res.status(200).send({ article: response });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewArticle = (req, res, next) => {
  const { author, title, body, topic, article_img_url } = req.body;

  if (!body) {
    res.status(400).send({ msg: "Bad Request" });
  }
  addNewArticle(author, title, body, topic, article_img_url)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
