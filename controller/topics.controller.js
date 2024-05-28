const express = require("express");
const app = express();

const {
  fetchAllTopics,
  fetchAllEndpoints,
} = require("../models/topics.models");

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topic) => {
      res.status(200).send({ topic });
    })
    .catch(next);
};

exports.getAllEndpoints = (req, res, next) => {
  const endpoints = fetchAllEndpoints();
  res.status(200).send({ endpoints });
};
