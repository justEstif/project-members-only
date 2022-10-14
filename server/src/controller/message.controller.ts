import { User } from "@prisma/client";
import { RequestHandler, Response } from "express";
import { TRequest } from "../interface";
import { TCreateSchema } from "../schema/message.schema";
import { getMessagesForUser } from "../service/message.service";

/**
 * @description function for creating a message
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
    res.status(201).json(message);
  }
};

/**
 * @description function to get messages and details based on role
 * @return If there is no user or user is USER role, return messages, without user
 * @return IF ADMIN or MEMBER, return user or sender
 * @return error is user is doesn't match
 */
export const getMessages: RequestHandler = async (req, res) => {
  const { error, messages } = await getMessagesForUser(req.user as User);
  messages ? res.status(200).json(messages) : res.status(400).json(error);
};

/**
 * @description function to delete message
 * @return success message if deleted or error
 */
export const deleteMessage: RequestHandler = async (req, res) => {
  try {
    await prisma.message.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Deleted message",
      url: req.url,
    });
  } catch (error) {
    res.status(403).json({
      error: "Couldn't delete message",
      url: req.url,
    });
  }
};
