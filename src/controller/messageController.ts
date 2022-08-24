import { RequestHandler, Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"
import Message from "../models/message"
// import User from "../models/user"

// NOTE: HOMEPAGE
export const index_get: RequestHandler = (_, res, next) => {
  Message.find()
    .sort({ timestamp: 1 }) // sort by timestamp
    .populate("user") // replace user id with user info
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

// NOTE: READ THE MESSAGES AND OPEN HOMEPAGE AGAIN
export const index_post = [
  body("messageTitle")
    .trim()
    .exists()
    .isLength({ min: 1 })
    .withMessage("Must be atleast one character")
    .isAlphanumeric()
    .withMessage("Only alphabets or numbers are accepted"),
  body("messageBody")
    .trim()
    .exists()
    .isLength({ min: 1 })
    .withMessage("Must be atleast one character")
    .isAlphanumeric()
    .withMessage("Only alphabets or numbers are accepted"),

  (req: Request, res: Response, next: NextFunction) => {
    const message = new Message({
      title: req.body.messageTitle,
      body: req.body.messageBody,
      user: req.body.userID,
    })

    const errors = validationResult(req)
    switch (!errors.isEmpty()) {
      case true:
        res.render("sign_up_form", {
          title: "Sign Up",
          errors: errors.array(),
          message: message,
          messageURL: message.url
        })
        return
      default:
        message.save((err) => {
          if (err) return next(err)
          else {
            res.redirect("/")
          }
        })
    }
  },
]

// NOTE: Do I even need a separate file?
export const message_detail: RequestHandler = (req, res, next) => {
  Message.findById(req.params.id)
    .populate("user") // replace user id with user info
    .exec((err, message) => {
      if (err) next(err)
      else {
        res.render("message_detail", {
          title: "Message Board",
          message: message
        })
      }
    })
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
