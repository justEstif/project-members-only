import { User } from "@prisma/client";
import { omitFromUser } f../utils/prismaOmitclude";
import { Context } from "./context";

export async function mockCreateUser(registerInfo: User, ctx: Context) {
  const user = await ctx.prisma.user.create({
    data: {
      name: registerInfo.name,
      email: registerInfo.email,
      userName: registerInfo.userName,
      password: registerInfo.password,
      id: registerInfo.id,
      role: registerInfo.role,
    },
  });
  return omitFromUser(user, "password");
}
