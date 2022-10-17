import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

/**
 * @description middlware for validating req.body against schema
 * @returns either next function or error
 */
const validate =
  (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        next();
      } catch (error) {
        return error instanceof ZodError
          ? res.status(400).json({
            error: error.errors,
          })
          : res.status(400).json({
            error: String(error),
          });
      }
    };

export default validate;
