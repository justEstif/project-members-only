import { RequestHandler } from "express"
// import User from "../models/user"

// NOTE: HOMEPAGE
export const index: RequestHandler = (_, res) => {
  res.render("message_index", { title: "Sign Up" })
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
