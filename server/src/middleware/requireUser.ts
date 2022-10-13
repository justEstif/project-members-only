import { RequestHandler } from "express";

/**
* @description middleware for checking if there is a user
* @returns either next function or response if no jwt token
*/
const requireUser: RequestHandler = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send(403).json("No jwt token");
  }
};

export default requireUser;
