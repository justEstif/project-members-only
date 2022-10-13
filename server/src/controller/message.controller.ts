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
  const message = await prisma.message.create({
    data: {
      text: req.body.text,
      userId: req.user.id,
    },
  });
  res.send(200).json(message);
};
