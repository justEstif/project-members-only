import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import passport from "passport";
import { createJwtToken, register } from "../service/authentication.service";

/**
 * @description function to register user and login
 */
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { user, token } = await register(req);
    req.login(user, { session: false }, (err) => {
      err ? res.status(400).json(err) : res.status(201).json({ user, token });
    });
  } catch (error) {
    error instanceof Prisma.PrismaClientKnownRequestError
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
 * @description function to login user
 */
export const loginUser: RequestHandler = async (req, res) => {
  passport.authenticate("local", { session: false }, (error, user) => {
    error || !user
      ? res.status(400).json({
        message: "Something is not right",
      })
      : req.login(user, { session: false }, (err) => {
        err
          ? res.status(400).json(err)
          : res.status(200).json({ user, token: createJwtToken(user) });
      });
  })(req, res);
};

/**
 * @description function to logout user
 */
export const logoutUser: RequestHandler = (req, res) => {
  req.logout((err) => {
    err ? res.status(200).json(err) : res.status(200).json("User logged out");
  });
};
