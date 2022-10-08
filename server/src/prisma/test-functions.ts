import { Context } from "./context";

interface CreateUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  profilePic: string;
  status: "admin" | "member" | "user";
}

export async function createUser(user: CreateUser, ctx: Context) {
  return await ctx.prisma.user.create({
    data: user,
  });
}

interface UpdateUser {
  id: number;
  name: string;
  email: string;
}

export async function updateUsername(user: UpdateUser, ctx: Context) {
  return await ctx.prisma.user.update({
    where: { id: user.id },
    data: user,
  });
}
