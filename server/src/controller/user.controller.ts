import { User } from "@prisma/client";
import { Response } from "express";
import { TRequest } from "../interface";
import { TUpdateSchema } from "../schema/user.schema";

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
        const updatedUser = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
          },
        });
        res.status(200).json({
          user: updatedUser,
          error: null,
        });
      } catch (error) {
        res.status(200).json({
          user: null,
          error: "Prisma error; couldn't updated user",
        });
      }
      // TODO update user here
    } else {
      res.status(400).json({
        user: null,
        error: "Auth error; couldn't updated user",
      });
    }
  }
};
