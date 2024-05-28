const express = require("express");
const app = express();

const { fetchAllTopics } = require("../models/topics.models");

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topic) => {
      res.status(200).send({ topic });
    })
    .catch(next);
};

app.use((err, req, res, next) => {});
