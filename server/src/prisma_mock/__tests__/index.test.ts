import { MockContext, Context, createMockContext } from "../context";
import { createUser } from "../user_functions";

// NOTE https://github.com/prisma/prisma-examples/blob/latest/databases/sql-server/tests/prisma.test.ts
let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

// test the create user
test("should create new user", async () => {
  const user = {
    id: "thisid", // an id is assigned randomly(here for testing)
    firstName: "Rich", // alphabet only first and last name
    lastName: "H",
    userName: "richyy1", // alphabet and numbers and dot(.) only
    email: "richyy1@email.com", // valid unique email
    password: "this-is-pw", // pw (10-20 chars)
    rePassword: "this-is-pw", // (10 - 20 chars)
  };

  await expect(createUser(user, ctx)).resolves.toEqual({
    id: "thisid",
    firstName: "Rich", // alphabet only first and last name
    lastName: "H",
    userName: "richyy1", // alphabet and numbers and dot(.) only
    email: "richyy1@email.com", // valid unique email
    password: "this-is-pw", // pw (10-20 chars)
    rePassword: "this-is-pw", // (10 - 20 chars)
    role: "USER",
  });
});

// test update user

// test get user

// test delete user
