const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const data = require("../db/data/test-data/index");
const apiEndpoints = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("status: 200 responds with all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topic } = body;
        expect(topic).toHaveLength(3);
        topic.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
  test("GET 404 responds with a 404 because the route is not found", () => {
    return request(app)
      .get("/api/notARoute")
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api", () => {
  test("status 200: responds with object describing all the available endpoints on the API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const { body } = response;
        const { endpoints } = body;
        expect(endpoints).toEqual(apiEndpoints);
      });
  });
});

describe("GET /api/articles/1", () => {
  test("status 200: responds with the correct article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("GET 404 responds with a 404 when id is valid but not found", () => {
    return request(app)
      .get("/api/articles/99999999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });
  test("GET 400 responds with a 400 when id is not in a valid format", () => {
    return request(app)
      .get("/api/articles/notAnId")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/articles", () => {
  test("GET 200: gets all the articles ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("created_at", { descending: true });
        articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
      });
  });
  test("GET 404 responds with a 404 status code when id is not in a valid format", () => {
    return request(app)
      .get("/api/notARoute")
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/articles/1/comments", () => {
  test("GET 200: gets all comments for the article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body).toHaveLength(11);
        expect(body).toBeSortedBy("created_at", { descending: true });
        body.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            article_id: 1,
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
          });
        });
      });
  });
  test("GET 404 responds with a 404 because id is valid but not found", () => {
    return request(app)
      .get("/api/articles/99999999/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });
  test("GET 400 responds with a 400 because id is on invalid format", () => {
    return request(app)
      .get("/api/articles/notAnId/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

describe("POST api/articles/:article_id/comments ", () => {
  test("POST 201: responds with a comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .expect(201)
      .send({
        username: "butter_bridge",
        body: "I love life",
      })
      .then((response) => {
        const { comment } = response.body;
        expect(comment.body).toBe("I love life");
        expect(comment).toMatchObject({
          comment_id: 19,
          body: "I love life",
          article_id: 1,
          author: "butter_bridge",
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });
  test("POST 404 responds with a 404 because id is valid but not found", () => {
    return request(app)
      .post("/api/articles/99999999/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });
  test("POST 400 responds with a 400 id is not in the correct format", () => {
    return request(app)
      .post("/api/articles/notAnId/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test.skip("POST 400 responds with bad request when sending a malformed body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
        not_a_field: "not_a_value",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test.skip("POST 404 responds with a 404 because username is valid but not found", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "not_a_username",
        body: "I love life",
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });
});

describe("PATCH api/articles/:article_id ", () => {
  test("PATCH 200: responds with the updated article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 3 })
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article.votes).toBe(103);
      });
  });
  test("PATCH 404 responds with a 404 because id is valid but not found", () => {
    return request(app)
      .patch("/api/articles/9988")
      .send({ inc_votes: 3 })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });
  test("PATCH 200 responds with same body when passed 0 votes", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 0 })
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("PATCH 400 responds with a 400 because new vote is not sent as a number", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "hello" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});

test("DELETE:204 deletes the specified comment and sends no body back", () => {
  return request(app).delete("/api/comments/1").expect(204);
});
test("DELETE:404 responds with an appropriate status and error message when given a non-existent id", () => {
  return request(app)
    .delete("/api/comments/9999899")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("Not Found");
    });
});
test("DELETE:400 responds with an appropriate status and error message when given an invalid id", () => {
  return request(app)
    .delete("/api/comments/not-a-comment")
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe("Bad Request");
    });
});

describe("GET /api/users", () => {
  test("status: 200 responds with all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        console.log(body.users);
        expect(body.users).toHaveLength(4);
        body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
  test("GET 404 responds with a 404 because the route is not found", () => {
    return request(app)
      .get("/api/notARoute")
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe("Not Found");
      });
  });
});
