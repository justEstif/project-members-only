import app from "../../app";
import request from "supertest";

test("index route works", (done) => {
  request(app)
    .get("/")
    .expect("Content-Type", /json/)
    .expect({ name: "frodo" })
    .expect(200, done);
});

test("testing route works", async () => {
  await request(app).post("/test").type("form").send({ item: "hey" });
  const response = await request(app).get("/test");
  expect(response.body).toEqual({ array: ["hey"] });
});
