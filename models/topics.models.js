const db = require("../db/connection");
const endpoints = require("../endpoints.json");

const format = require("pg-format");

exports.fetchAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then((response) => {
    return response.rows;
  });
};

exports.fetchAllEndpoints = () => {
  console.log(endpoints);
  return endpoints;
};
