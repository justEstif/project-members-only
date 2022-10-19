import { Router } from "express";
import passport from "passport";
import validate from "./middleware/validate";
import { loginSchema, registerSchema } from "./schema/authentication.schema";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "./controller/authentication.controller";
import {
  createMessage,
  deleteMessage,
  getMessage,
  getMessages,
  updateMessage,
} from "./controller/message.controller";
import { messageSchema } from "./schema/message.schema";
import { deleteUser, updateUser } from "./controller/user.controller";

const router = Router();

/**
 * @desc Check if the api is working
 * @route GET /api/checkhealth
 * @access Public
 */
router.get("/checkhealth", (_, res) => {
  res.sendStatus(200);
});

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
 * @route GET /api/logout
 * @access Public
 */
router.get("/logout", logoutUser);

/**
 * @desc Post a message
 * @route POST /api/message
 * @access Private: only logged in users
 */
router.post(
  "/message",
  [passport.authenticate("jwt", { session: false }), validate(messageSchema)],
  createMessage
);

/**
 * @desc Get all messages
 * @route GET /api/message
 * @access Public(with limitations)
 */
router.get(
  "/message/",
  passport.authenticate(["jwt", "anonymous"], { session: false }),
  getMessages
);

/**
 * @desc Get a message
 * @route GET /api/message/:id
 * @access Public (with limitations)
 */
router.get(
  "/message/:id",
  passport.authenticate(["jwt", "anonymous"], { session: false }),
  getMessage
);

/**
 * @desc Update a message
 * @route PUT /api/message/:id
 * @access Private
 */
// NOTE the update function isn't working
router.put(
  "/message/:id",
  passport.authenticate("jwt", { session: false }),
  validate(messageSchema),
  updateMessage
);

/**
 * @desc Delete a message
 * @route DELETE /api/message/:id
 * @access Private: only admin or the write of the message
 */
router.delete(
  "/message/:id",
  passport.authenticate("jwt", { session: false }),
  deleteMessage
);

/**
 * @description Update user info
 * @route PUT /api/user/:id
 * @access Private; can only update your own account
 */
router.put(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  validate(registerSchema),
  updateUser
);

/**
 * @desc Delete user
 * @route DELETE /api/user/:id
 * @access Private, only user or admin
 */
router.delete(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

export default router;
