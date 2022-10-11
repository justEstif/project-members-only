import { Router } from "express";
import validate from "./middleware/validate";
import { loginSchema, registerSchema } from "./schema/authentication.schema";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "./controller/authentication.controller";

const router = Router();

// @path /api/checkhealth
router.get("/checkhealth", (_, res) => {
  res.sendStatus(200);
});

// authentication routes: register, login, logout

/*
 * @desc Register a user
 * @route POST /api/register
 * @access Public
 */
router.post("/register", validate(registerSchema), registerUser);

/*
 * @desc Login a user
 * @route POST /api/login
 * @access Public
 */
router.post("/login", validate(loginSchema), loginUser);

/*
 * @desc Logout user
 * @route get /api/logout
 * @access Public
 */
router.get("/logout", logoutUser);

// middleware called require user to assign the user value

export default router;
