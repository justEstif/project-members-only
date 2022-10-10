import request from "supertest";
import app from "../../app";
import {
  MockContext,
  Context,
  createMockContext,
} from "../../prisma_mock/context";
import { mockCreateUser } from "../../prisma_mock/user_functions";


// @type POST
// @path /api/user
describe("POST /api/user", () => {
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  it("responds with json", (done) => {
    request(app)
      .post("/api/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it("creates a user", (done) => {
    const validUser = {
      name: "Wick",
      userName: "johnWick123",
      email: "johnWick@email.com",
      password: "doggydogpw",
      passwordConfirmation: "doggydogpw",
    };
    request(app)
      .post("/api/user")
      .send(validUser)

      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        else {
          expect(mockCreateUser({ body: validUser }, ctx)).toBeTruthy();
        }
        return done();
      });
  });

  // the validate middleware works
  it("doesn't create a user", (done) => {
    const inValidUser = {
      name: "Wick",
      userName: "johnWick123",
      email: "johnWick@email.com",
      password: "notMatchingPw",
      passwordConfirmation: "doggydogpw",
    };
    request(app)
      .post("/api/user")
      .send(inValidUser)

      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.body.user).toBeFalsy();
        return done();
      });
  });
});
