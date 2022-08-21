import { Router } from "express"
import * as message_controller from "../controller/messageController"
import * as user_controller from "../controller/userController"

const router = Router()

// NOTE: Homepage
// routes.get("/", message_controller.index)

// Setting up sign-up page
// app.get("/sign-up", (_: Request, res: Response) => res.render("sign-up-form"));
// app.post("/sign-up", (req, res, next) => {
//   new User({
//     username: req.body.username,
//     password: req.body.password,
//   }).save((err) => {
//     if (err) return next(err);
//     else res.redirect("/");
//   });
// });
//
// // Setting up login page
// app.get("/log-in", (_: Request, res: Response) => res.render("log-in"));
// app.post(
//   "/log-in",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/",
//   })
// );

// app.get("/log-out", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     } else {
//       res.redirect("/");
//     }
//   });
// });
//

// NOTE: Only show if not logged in, else redirect to home(or do nothing)

// to sign up as member
router.get("/sign-up", user_controller.user_sign_up_get)
router.get("/sign-up", user_controller.user_sign_up_post)

// to login as a user
router.get("/sign-in", user_controller.user_sign_in_get)
router.get("/sign-in", user_controller.user_sign_in_post)

// NOTE: Only show if logged in, else redirect to home(or do nothing)

// to sign-out -> no post needed
router.get("/sign-out", user_controller.user_sign_out_get)

// to join club
router.get("/join-club", user_controller.user_join_club_get)
router.get("/join-club", user_controller.user_join_club_post)

// NOTE: Only show if club member

// to become admin
router.get("/be-admin", user_controller.be_admin_get)
router.post("/be-admin", user_controller.be_admin_post)

// NOTE: Messages route
// GET request for one message.
router.get("/message/:id", message_controller.message_detail)

// Only the sender or an admin can delete a message
router.get("/message/:id/delete", message_controller.message_delete_get)
router.post("/message/:id/delete", message_controller.message_delete_post)

// Only the sender of the message can update the message
router.get("/message:id/update", message_controller.message_update_get)
router.post("/message:id/update", message_controller.message_update_post)
