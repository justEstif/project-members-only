import { RequestHandler } from "express"

// NOTE: Display all messages with user, and sort decreasing
export const index: RequestHandler = (_, res) => {
  res.render("messages_index")
}

export const sign_in_get: RequestHandler = (_, res) => {
  res.render("sign_in")
}

export const sign_in_post: RequestHandler = (_, res) => {
  res.render("sign_in")
}

export const sign_up_get: RequestHandler = (_, res) => {
  res.render("sign_up")
}

export const sign_up_post: RequestHandler = (_, res) => {
  res.render("sign_up")
}

export const sign_out_get: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    } else {
      res.redirect("/")
    }
  })
}

export const join_club_get: RequestHandler = (_, res) => {
  res.render("join_club")
}

export const join_club_post: RequestHandler = (_, res) => {
  res.render("join_club")
}

export const be_admin_get: RequestHandler = (_, res) => {
  res.render("be_admin")
}

export const be_admin_post: RequestHandler = (_, res) => {
  res.render("be_admin")
}
