import { MockContext, Context, createMockContext } from "../context";
import { mockCreateUser } from "../user_functions";

// NOTE https://github.com/prisma/prisma-examples/blob/latest/databases/sql-server/tests/prisma.test.ts
let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

const validCreateUser = {
  name: "Name",
  userName: "richhyName2",
  email: "test@test.com",
  password: "testpassword",
  passwordConfirmation: "testpassword"
};

test("show create new user ", async () => {
  const user = validCreateUser;
  await expect(mockCreateUser({body: validCreateUser}, ctx)).resolves.toEqual(user);
});