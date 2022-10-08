import { Context } from "./context";

interface CreateUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  rePassword: string;
}

export async function createUser(user: CreateUser, ctx: Context) {
  return await ctx.prisma.user.create({
    data: user,
  });
}

interface UpdateUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  rePassword: string;
}

export async function updateUsername(user: UpdateUser, ctx: Context) {
  // overwrite the old profile pic
  return await ctx.prisma.user.update({
    where: { id: user.id },
    data: user,
  });
}
