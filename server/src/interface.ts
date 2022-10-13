import { User } from "@prisma/client";
import { Send } from "express-serve-static-core";

// source: https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c

export interface TRequest<T> extends Express.Request {
  user: User;
  body: T;
}

export interface TResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}
