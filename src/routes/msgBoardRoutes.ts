// import { Router } from "express";

// const routes = Router()

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
