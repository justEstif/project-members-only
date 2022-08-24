import { RequestHandler } from "express"
// import User from "../models/user"

// NOTE: HOMEPAGE
export const index_get: RequestHandler = (_, res, next) => {
  // TODO: Get the user and the message in order of time sent
  Message.find()
    .sort({ timestamp: 1 }) // sort by timestamp
    .populate("user")
    .exec((err, messages) => {
      if (err) next(err)
      else {
        res.render("message_index", {
          title: "Message Board",
          ...(messages.length !== 0 && { messages: messages }),
        })
      }
    })
}

export const message_detail: RequestHandler = (_, res) => {
  res.render("message_detail")
}

export const message_update_get: RequestHandler = (_, res) => {
  res.render("message_update")
}

export const message_update_post: RequestHandler = (_, res) => {
  res.render("message_update")
}

export const message_delete_get: RequestHandler = (_, res) => {
  res.render("message_delete")
}

export const message_delete_post: RequestHandler = (_, res) => {
  res.render("message_delete")
}
