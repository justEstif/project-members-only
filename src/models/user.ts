import { Schema, model } from "mongoose"
import bcryptjs from "bcryptjs"

interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  membershipStatus: string
  url?: string
  admin: boolean
  comparePassword: (password: string, callback: (arg1: null | Error, arg2?: boolean) => void) => boolean
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  membershipStatus: {
    type: String,
    required: true,
    enum: ["User", "Member"],
    default: "User",
  },
  admin: { type: Boolean, default: false },
})

UserSchema.virtual("fullName").get(function () {
  return this.firstName && this.lastName ? `${this.lastName}, ${this.firstName}` : ""
})

UserSchema.virtual("url").get(function () {
  return "/user/" + this._id
})

UserSchema.pre("save", function (next) {
  const user = this
  if (user.isModified("password") || user.isNew) {
    if (user.password === undefined) return next()
    bcryptjs.genSalt(10, (err, salt) => {
      if (err) console.log(err)
      else {
        bcryptjs.hash(user.password, salt, function (err, hash) {
          if (err) console.log(err)
          else {
            user.password = hash
            next()
          }
        })
      }
    })
  } else return next()
})

UserSchema.methods = {
  comparePassword: function (password: string, callback: (arg1: null | Error, arg2?: boolean) => void) {
    bcryptjs.compare(password, this.password, function (error, isMatch) {
      if (error) return callback(error)
      else callback(null, isMatch)
    })
  },
}

const User = model<IUser>("User", UserSchema)
export { IUser }
export default User
