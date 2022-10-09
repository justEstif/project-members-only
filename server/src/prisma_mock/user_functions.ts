import { Context } from "./context";

interface CreateUser {
  id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

export async function createUser(user: CreateUser, ctx: Context) {
  return await ctx.prisma.user.create({
    data: user,
  });
}
