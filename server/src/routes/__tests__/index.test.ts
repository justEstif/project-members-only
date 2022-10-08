import app from "../../app";
import request from "supertest";

// @path /api/checkhealth
test("check health route works", (done) => {
  request(app).get("/api/checkhealth").expect(200, done);
});
