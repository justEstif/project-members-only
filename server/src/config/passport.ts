import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import omit from "lodash.omit";

/**
 * @returns user without password
 * @returns error message
 */
export const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "passport",
  },
  async (email, password, cb) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return !user
      ? cb(null, false, { message: "Incorrect email or password" })
      : !(await bcrypt.compare(password, user.password).catch(() => false))
      ? cb(null, false, { message: "Incorrect email or password" })
      : cb(null, omit(user, ["password"]), {
          message: "Logged in Successfully",
        });
  }
);
