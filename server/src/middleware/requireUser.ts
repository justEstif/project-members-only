import { RequestHandler } from "express";

const requireUser: RequestHandler = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send(403).json("No jwt token");
  }
};

export default requireUser;
