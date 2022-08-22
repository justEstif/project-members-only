import User from "../models/user"
import { Strategy } from "passport-local"

const localStrategy = new Strategy((username, password, done) => {
  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      return done(err)
    } else if (!user) {
      return done(null, false, { message: "Incorrect username" })
    } else {
      user.comparePassword(password, function (matchError, isMatch) {
        if (matchError) {
          return done(matchError)
        } else if (!isMatch) {
          return done(null, false, { message: "Incorrect password" })
        } else {
          return done(null, user)
        }
      })
    }
  })
})

export default localStrategy
