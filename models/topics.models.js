const db = require("../db/connection");
const endpoints = require("../endpoints.json");

exports.fetchAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then((response) => {
    return response.rows;
  });
};

exports.fetchAllEndpoints = () => {
  return endpoints;
};
