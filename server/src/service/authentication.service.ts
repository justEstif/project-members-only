import { TRegisterSchema } from "../schema/authentication.schema";
import omit from "lodash.omit";
import prisma from "../config/prisma";
import env from "../config/env";
import bcrypt from "bcryptjs";

export const register = async ({ body }: TRegisterSchema) => {
  // hash password
  const salt = await bcrypt.genSalt(env.saltWorkFactor);
  const hashedPassword = bcrypt.hashSync(body.password, salt);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      userName: body.userName,
    },
  });

  return omit(user, ["password"]);
};
