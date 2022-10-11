import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import { register } from "../service/authentication.service";

/**
 * @desc function to register user and login
 */
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { user, token } = await register(req);
    req.login(user, (err) => {
      if (err) throw err;
      return res.status(200).json({ user, token });
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).json({
          error:
            "There is a unique constraint violation, a new user cannot be created with this email or username",
        });
      } else {
        return res.status(400).json({
          error: error.message,
        });
      }
    } else {
      return res.status(400).json({
        error: "Unknown error",
      });
    }
  }
};
