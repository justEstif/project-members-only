import { User } from "@prisma/client";
import { RequestHandler, Response } from "express";
import { TRequest } from "../interface";
import { TUpdateSchema } from "../schema/user.schema";
import { deleteUserService, updateUserService } from "../service/user.service";

/**
 * @description function to update user
 */
export const updateUser = async (
  req: TRequest<TUpdateSchema["body"], { id: string }>,
  res: Response
) => {
  const { user, error } = await updateUserService(
    req.user as User,
    req.params.id,
    req.body
  );
  user ? res.status(200).json(user) : res.status(400).json(error);
};

/**
 * @description function to delete user
 */
export const deleteUser: RequestHandler = async (req, res) => {
  const { message, error } = await deleteUserService(
    req.user as User,
    req.params.id
  );

  message ? res.status(200).json(message) : res.status(400).json(error);
};
