import { Router } from "express"
import * as message_controller from "../controller/messageController"
import * as user_controller from "../controller/userController"

const router = Router()

// NOTE: Messages route

router.get("/", message_controller.index) // Homepage

router.get("/message/:id", message_controller.message_detail) // message detail page

// Only the sender or an admin can delete a message
router.get("/message/:id/delete", message_controller.message_delete_get)
router.post("/message/:id/delete", message_controller.message_delete_post)

// Only the sender of the message can update the message
router.get("/message:id/update", message_controller.message_update_get)
router.post("/message:id/update", message_controller.message_update_post)

// NOTE: User route

// to sign-out (if signed in)
router.get("/user:id/sign-out", user_controller.sign_out_get)

// to join club (if signed in)
router.get("/user:id/join-club", user_controller.join_club_get)
router.get("/user:id/join-club", user_controller.join_club_post)

// to become admin (if a club member)
router.get("/user:id/be-admin", user_controller.be_admin_get)
router.post("/user:id/be-admin", user_controller.be_admin_post)

// to sign up as member (if not logged in)
router.get("/sign-up", user_controller.sign_up_get)
router.get("/sign-up", user_controller.sign_up_post)

// to login as a user (if not logged in)
router.get("/sign-in", user_controller.sign_in_get)
router.get("/sign-in", user_controller.sign_in_post)
