import { User } from "@prisma/client";
import { RequestHandler, Response } from "express";
import { TRequest } from "../interface";
import { TCreateSchema } from "../schema/message.schema";
import { omitFromMessage } from "../utils/prismaOmit";

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

/**
 * @description function to get messages and details based on role
 */
export const getMessages: RequestHandler = async (req, res) => {
  /** If there is no user, return messages, without user*/
  if (!req.user) {
    const messages = await prisma.message.findMany({});
    messages.map((message) => omitFromMessage(message, "userId"));
    res.status(200).json(messages);
  } else {
    const { id } = req.user as User;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      /** If the user is USER role, return messages, without user*/
      if (user.role === "USER") {
        const messages = await prisma.message.findMany({});
        messages.map((message) => omitFromMessage(message, "userId"));
        res.status(200).json(messages);
      } else {
        /** If the user is ADMIN or MEMBER role, return messages, with user id and userName */
        const messages = await prisma.message.findMany({
          include: {
            user: {
              select: {
                id: true,
                userName: true,
              },
            },
          },
        });
        res.status(200).json(messages);
      }
    } else {
      /**If the user isn't found return error*/
      res.status(400).json("User not found");
    }
  }
};
