const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const data = require("../db/data/test-data/index");

describe("GET /api/topics", () => {
  test("GET 404 responds with a 404 status code", () => {
    return request(app)
      .get("/api/notARoute")
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});
