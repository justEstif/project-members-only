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
    name: string(),
    userName: string(),
    email: string().email("Not a valid email"),
    password: string().min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string(),
    secretKey: string(),
  })
    .partial()
    .refine((data) => data.password && data.passwordConfirmation, {
      message: "both password and passwordConfirmation are required",
      path: ["passwordConfirmation", "password"],
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
});

export type TUpdateSchema = TypeOf<typeof updateSchema>;
