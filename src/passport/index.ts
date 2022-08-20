import passport from "passport";
import { Strategy } from "passport-local";
import User, { IUser } from "../models/user";

interface IExpressUser extends Express.User {
  id: string;
}

// Passport setup LocalStrategy to be used on authenticate
passport.use(
  new Strategy((username, password, done) => {
    User.findOne({ username: username }).exec((err, user) => {
      if (err) {
        return done(err);
      } else if (!user) {
        return done(null, false, { message: "Incorrect username" });
      } else {
        user.comparePassword(password, function (matchError, isMatch) {
          if (matchError) {
            return done(matchError);
          } else if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          } else {
            return done(null, user);
          }
        });
      }
    });
  })
);

// Creates cookies to confirm the user is currently logged in
passport.serializeUser((user, done) => {
  const eUser: IExpressUser = user as IExpressUser;
  done(null, eUser.id);
});

// Delete cookies when the user leaves
passport.deserializeUser((id, done) => {
  User.findById(id, (err: Error, user: IUser) => {
    done(err, user);
  });
});
