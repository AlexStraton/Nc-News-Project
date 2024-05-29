const db = require("../db/connection");

exports.fetchArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((article) => {
      console.log(article.rows);
      if (article.rows.length === 0) {
        return res.status(404).send({ msg: "Article not found" });
      }
      return article.rows[0];
    });
};
