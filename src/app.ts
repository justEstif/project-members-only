import express, { Express } from "express"
import endpoints from "./endpoints.config"
import path from "path"
import favicon from "serve-favicon"
import { connect, connection } from "mongoose"
import compression from "compression"
import helmet from "helmet"
import session from "express-session"
import passport from "passport"
import router from "./routes/msgBoardRoutes"
import MongoStore from "connect-mongo"
import localStrategy from "./modules/passport.config"
import User, { IUser } from "./models/user"

const app: Express = express()
const port = process.env.PORT || 5000

connect(endpoints.MONGO_URL)
connection.on("error", console.error.bind(console, "mongo connection error"))

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
    store: MongoStore.create({ mongoUrl: endpoints.MONGO_URL }),
    cookie: { maxAge: 1000 * 30 },
  })
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use("/", router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
