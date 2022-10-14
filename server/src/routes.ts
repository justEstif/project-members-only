import { Router } from "express";
import validate from "./middleware/validate";
import requireUser from "./middleware/requireUser";
import { loginSchema, registerSchema } from "./schema/authentication.schema";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "./controller/authentication.controller";
import { createMessage, getMessages } from "./controller/message.controller";
import passport from "passport";
import { messageSchema } from "./schema/message.schema";

const router = Router();

/** NOTE User Routes: get user, delete user, update user */
/**
 * @desc Get user page
 * @route GET /api/user/:id
 * @access Public
 */

/**
 * @desc Update user info
 * @route UPDATE /api/user/:id
 * @access Private
 */

/**
 * @desc Delete user
 * @route DELETE /api/user/:id
 * @access Private
 */

// middleware called require user to assign the user value

router.get(
  "/random",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      user: req.user,
      token: req.query.user,
    });
  }
);
/**
 * @desc Check if the api is working
 * @route GET /api/checkhealth
 * @access Public
 */
router.get("/checkhealth", (_, res) => {
  res.sendStatus(200);
});

/** NOTE authentication routes: register, login, logout */

/**
 * @desc Register a user
 * @route POST /api/register
 * @access Public
 */
router.post("/register", validate(registerSchema), registerUser);

/**
 * @desc Login a user
 * @route POST /api/login
 * @access Public
 */
router.post("/login", validate(loginSchema), loginUser);

/**
 * @desc Logout user
 * @route get /api/logout
 * @access Public
 */
router.get("/logout", logoutUser);

/** NOTE Message routes: get all, get one, create */

/**
 * @desc Post a message
 * @route Post /api/message
 * @access Private: only logged in users
 */
router.post(
  "/message",
  [
    passport.authenticate("jwt", { session: false }),
    requireUser,
    validate(messageSchema),
  ],
  createMessage
);

/**
 * @desc Get all messages
 * @route GET /api/message
 * @access Public(with limitations)
 */
router.get(
  "/message/",
  passport.authenticate("jwt", { session: false }),
  getMessages
);

/**
 * @desc Get a message
 * @route GET /api/message/:id
 * @access Public (with limitations)
 */
// router.get("/message/:id", getMessage)

/**
 * @desc Delete a message
 * @route DELETE /api/message/:id
 * @access Private
 */
// router.delete("/message/:id", deleteMessage)

/**
 * @desc Update a message
 * @route UPDATE /api/message/:id
 * @access Private
 */
// router.update("/message/:id", updateMessage)
export default router;
