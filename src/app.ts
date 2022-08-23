import express, { Express } from "express"
import path from "path"
import favicon from "serve-favicon"
import { connect, connection } from "mongoose"
import compression from "compression"
import helmet from "helmet"
import session from "express-session"
import passport from "passport"
import router from "./routes/msgBoardRoutes"
import localStrategy from "./modules/passport.config"
import User, { IUser } from "./models/user"
import endpoints from "./endpoints"

const app: Express = express()

// Mongoose setup
connect(endpoints.MONGO_URL)
connection.on("error", console.error.bind(console, "mongo connection error"))

// Setup View
app.set("views", path.join(__dirname, "..", "views"))
app.set("view engine", "pug")

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Favicon server middleware
app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")))

// Compression and Helmet setup
app.use(compression())
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
)

// Passport
passport.use(localStrategy)

// Creates cookies to confirm the user is currently logged in
passport.serializeUser((user, done) => {
  interface IExpressUser extends Express.User {
    id: string
  }
  const eUser: IExpressUser = user as IExpressUser
  done(null, eUser.id)
})

// Delete cookies when the user leaves
passport.deserializeUser((id, done) => {
  User.findById(id, (err: Error, user: IUser) => {
    done(err, user)
  })
})

// Session Setup
app.use(
  session({
    secret: endpoints.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// access the user as currentUser in views
app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.use("/", router)

const port = endpoints.PORT
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
