const db = require("../db/connection");

exports.fetchArticleById = (article_id) => {
  const queryValues = [article_id];

  let queryString = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url, 
  CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
  FROM articles 
  LEFT JOIN comments ON articles.article_id = comments.article_id
  WHERE articles.article_id = $1
   GROUP BY articles.article_id
      ORDER BY articles.created_at DESC`;

  return db.query(queryString, queryValues).then((article) => {
    if (article.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Not Found",
      });
    }
    return article.rows[0];
  });
};

exports.fetchAllArticles = (topic) => {
  const queryValues = [];
  let queryString = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id`;

  if (topic) {
    queryValues.push(topic);
    queryString += ` WHERE articles.topic = $1`;
  }

  queryString += ` GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`;
  return db.query(queryString, queryValues).then((response) => {
    return response.rows;
  });
};

exports.checkTopicExists = (topic) => {
  if (topic) {
    return db
      .query(`SELECT * FROM topics WHERE slug = $1`, [topic])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Topic doesn't exist" });
        }
      });
  }
  return Promise.resolve();
};

exports.addCommentForArticle = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, body, author) VALUES ($1, $2, $3) RETURNING *`,
      [article_id, body, username]
    )
    .then((response) => {
      return response.rows[0];
    });
};

exports.insertVotes = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles
  SET votes = votes + $1
  WHERE article_id = $2
  RETURNING *`,
      [inc_votes, article_id]
    )
    .then((response) => {
      return response.rows[0];
    });
};
