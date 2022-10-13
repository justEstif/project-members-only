import { User } from "@prisma/client";
import { Response } from "express";
import { TRequest } from "../interface";
import { TCreateSchema } from "../schema/message.schema";

/**
 * @desc function for creating a message
 * @return response with message
 */
export const createMessage = async (
  req: TRequest<TCreateSchema["body"]>,
  res: Response
) => {
  if (!req.user) {
    res.status(403).json("No jwt token");
  } else {
    const { id } = req.user as User;
    const message = await prisma.message.create({
      data: {
        text: req.body.text,
        userId: id,
      },
    });
    res.status(200).json(message);
  }
};
