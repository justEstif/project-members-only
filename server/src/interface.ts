// source: https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c

import { Params } from "express-serve-static-core";

export interface TRequest<T, U extends Params> extends Express.Request {
  body: T;
  params: U;
}
