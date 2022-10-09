import { MockContext, Context, createMockContext } from "../context";
import { createUser } from "../user_functions";

// NOTE https://github.com/prisma/prisma-examples/blob/latest/databases/sql-server/tests/prisma.test.ts
let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

const validUser = {
  id: "thisisID",
  firstName: "Rich",
  lastName: "Name",
  userName: "richhyName2",
  email: "test@test.com",
  password: "testpassword",
  role: "USER",
};

test("show create new user ", async () => {
  const user = validUser;
  mockCtx.prisma.user.create.mockResolvedValue(user);
  await expect(createUser(user, ctx)).resolves.toEqual(user);
});

