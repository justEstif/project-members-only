import { object, string, TypeOf } from "zod";

/**
 * @description schema of message
 * @param text: string
 */
export const messageSchema = object({
  body: object({
    text: string({
      required_error: "Text is required",
    }),
  }),
});

export type TMessage = TypeOf<typeof messageSchema>;
