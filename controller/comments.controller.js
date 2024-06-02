const {
  fetchCommentsForArticle,
  checkArticleIdExists,
  removeCommentById,
  checkCommentIdExists,
  includeVotes,
} = require("../models/comments.models");

exports.getCommentsForArticle = (req, res, next) => {
  const { article_id } = req.params;

  checkArticleIdExists(article_id)
    .then(() => {
      return fetchCommentsForArticle(article_id);
    })
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  checkCommentIdExists(comment_id)
    .then(() => {
      return removeCommentById(comment_id);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentVote = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  checkCommentIdExists(comment_id)
    .then(() => {
      return includeVotes(inc_votes, comment_id);
    })
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
