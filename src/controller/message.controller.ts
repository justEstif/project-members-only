import { User } from "@prisma/client";
import { RequestHandler, Response } from "express";
import { TRequest } from "../interface";
import { TMessage } from "../schema/message.schema";
import {
  createMessageService,
  deleteMessageService,
  getMessageService,
  getMessagesService,
  updateMessageService,
} from "../service/message.service";

/**
 * @description function for creating a message
 * @return response with message
 */
export const createMessage = async (
  req: TRequest<TMessage["body"], []>,
  res: Response
) => {
  const { message, error } = await createMessageService(
    req.user as User,
    req.body
  );
  message ? res.status(201).json(message) : res.status(400).json(error);
};

/**
 * @description function to get messages and details based on role
 * @return If there is no user or user is USER role, return messages, without user
 * @return IF ADMIN or MEMBER, return user or sender
 * @return error is user is doesn't match
 */
export const getMessages: RequestHandler = async (req, res) => {
  const { error, messages } = await getMessagesService(req.user as User);
  messages ? res.status(200).json(messages) : res.status(400).json(error);
};

/**
 * @description function to get a message by the id
 * @return message
 */
export const getMessage: RequestHandler = async (req, res) => {
  const { error, message } = await getMessageService(
    req.user as User,
    req.params.id
  );
  message ? res.status(200).json(message) : res.status(400).json(error);
};

/**
 * @description function to get a message by the id
 * @return message
 */
export const updateMessage: RequestHandler = async (req, res) => {
  const { message, error } = await updateMessageService(
    req.user as User,
    req.params.id,
    req.body
  );
  message ? res.status(200).json(message) : res.status(400).json(error);
};

/**
 * @description function to delete message
 * @return success message if deleted or error
 */
export const deleteMessage: RequestHandler = async (req, res) => {
  const { error, message } = await deleteMessageService(
    req.user as User,
    req.params.id
  );
  message ? res.status(200).json(message) : res.status(403).json(error);
};
