import { RequestHandler } from "express"

// NOTE: Display all messages with user, and sort decreasing
export const index: RequestHandler = (_, res) => {
  res.render("messages_index")
}
