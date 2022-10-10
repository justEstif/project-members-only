import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import { register } from "../service/authentication.service";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const user = await register(req);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The code property can be accessed in a type-safe manner
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(400).json({
        error: "Unknown error",
      });
    }
  }
};
