import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import passport from "passport";
import { createJwtToken, register } from "../service/authentication.service";

/**
 * @desc function to register user and login
 */
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { user, token } = await register(req);

    passport.authenticate("local", { session: false }, (error) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
          error,
        });
      }

      req.login(user, { session: false }, (err) => {
        return err
          ? res.status(400).json(err)
          : res.status(200).json({ user, token });
      });
    })(req, res);
  } catch (error) {
    return error instanceof Prisma.PrismaClientKnownRequestError
      ? error.code === "P2002"
        ? res.status(400).json({
            error: "A new user cannot be created with this email or username",
          })
        : res.status(400).json({
            error: `Prisma error: ${error.message}`,
          })
      : res.status(400).json({
          error: `Not Prisma Error: ${error}`,
        });
  }
};

/**
 * @desc function to login user
 */
export const loginUser: RequestHandler = async (req, res) => {
  passport.authenticate("local", { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        const token = createJwtToken(user);
        return res.status(200).json({ user, token });
      }
    });
  })(req, res);
};

/**
 * @desc function to logout user
 */
export const logoutUser: RequestHandler = (req, res) => {
  req.logout((err) => {
    return err
      ? res.status(200).json(err)
      : res.status(200).json("User logged out");
  });
};
