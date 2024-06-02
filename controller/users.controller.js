const {
  fetchAllUsers,
  fetchUserByUsername,
  checkUsernameExists,
} = require("../models/users.models");

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  checkUsernameExists(username)
    .then(() => {
      return fetchUserByUsername(username);
    })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
