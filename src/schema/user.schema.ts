import { object, string, TypeOf } from "zod";

/**
 * @description schema of update
 * @param name: string
 * @param userName: string
 * @param email: string
 * @param password: string
 * @param passwordConfirmation: string
 */
export const updateSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    userName: string({
      required_error: "Username is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type TUpdateSchema = TypeOf<typeof updateSchema>;
