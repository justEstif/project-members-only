import omit from "lodash.omit";
import { CreateUserInput } from "../schema/user.schema";
import { Context } from "./context";

export async function mockCreateUser({ body }: CreateUserInput, ctx: Context) {
  const user = await ctx.prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      userName: body.userName,
    },
  });
  return omit(user, ["password"]); // don't return the password
}