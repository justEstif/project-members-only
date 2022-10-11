import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import omit from "lodash.omit";
import env from "./env";

/**
 * @returns user without password
 * @returns error message
 */
export const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
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

/**
 * @returns user or false
 */
export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWTSECRET,
  },
  async (jwtPayload, cb) => {
    const user = await prisma.user.findUnique({
      where: {
        id: jwtPayload.id,
      },
    });
    return user ? cb(null, user) : cb(false);
  }
);
