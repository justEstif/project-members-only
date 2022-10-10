import { RequestHandler } from "express";
import { createUser } from "../service/user.service";

// function for creating a user
export const createUserHandler: RequestHandler = async (req, res) => {
  try {
    const user = await createUser(req);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};
