import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import env from "../config/env";
import { RequestHandler, Response } from "express";
import { TRequest } from "../interface";
import { TUpdateSchema } from "../schema/user.schema";
import { omitFromUser } from "../utils/prismaOmit";

/**
 * @description function to update user
 */
export const updateUser = async (
  req: TRequest<TUpdateSchema["body"], { id: string }>,
  res: Response
) => {
  if (!req.user) {
    res.status(400).json("No user found");
  } else {
    const { id } = req.user as User;
    if (id === req.params.id) {
      try {
        const salt = await bcrypt.genSalt(env.SALTWORKFACTOR);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const updatedUser = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
          },
        });
        res.status(200).json({
          user: omitFromUser(updatedUser, "password"),
          error: null,
        });
      } catch (error) {
        res.status(200).json({
          user: null,
          error: "Prisma error; couldn't updated user",
        });
      }
    } else {
      res.status(400).json({
        user: null,
        error: "Auth error; couldn't updated user",
      });
    }
  }
};

/**
 * @description function to delete user
 */
export const deleteUser: RequestHandler = async (req, res) => {
  if (!req.user) res.status(403).json("No user; couldn't delete user");
  else {
    const user = req.user as User;

    if (user.id === req.params.id || user.role === "ADMIN") {
      try {
        const deleteUser = await prisma.user.delete({
          where: {
            id: user.id,
          },
        });
        res.status(200).json({
          user: deleteUser,
          error: null,
        });
      } catch (error) {
        res.status(400).json({
          error: "Prisma error; couldn't delete user",
          user: null,
        });
      }
    } else {
      res.status(400).json({
        error: "Auth error; couldn't delete user",
        user: null,
      });
    }
  }
};
