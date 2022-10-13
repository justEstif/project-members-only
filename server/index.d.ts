import { User } from "@prisma/client";
/* eslint-disable */
import { Express } from "express-serve-static-core";
/* eslint-enable */

declare module "express-serve-static-core" {
  interface Request {
    user?: Omit<User, "password">;
  }
}
