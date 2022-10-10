import { CreateUserInput } from "../schema/user.schema";
import omit from "lodash.omit";
import prisma from "../config/prisma";

export const createUser = async ({ body }: CreateUserInput) => {
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      userName: body.userName,
    },
  });
  return omit(user, ["password"]); // don't return the password
};
