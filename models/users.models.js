const db = require("../db/connection");

exports.fetchAllUsers = () => {
  return db.query(`SELECT * FROM users`).then((response) => {
    return response.rows;
  });
};

exports.fetchUserByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((response) => {
      return response.rows;
    });
};

exports.checkUsernameExists = (username) => {
  if (username) {
    return db
      .query(`SELECT * FROM users WHERE username = $1`, [username])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Username does not exist",
          });
        }

        return rows[0];
      });
  }
};
