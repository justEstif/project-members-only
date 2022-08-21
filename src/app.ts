import express, { Express, Request, Response, NextFunction } from "express"
import endpoints from "./endpoints.config"
import path from "path"
import favicon from "serve-favicon"
import { connect, connection } from "mongoose"
import compression from "compression"
import helmet from "helmet"
import session from "express-session"
import passport from "./modules/passport.config"

const app: Express = express()
const port = process.env.PORT || 5000

connect(endpoints.MONGO_URL)
connection.on("error", console.error.bind(console, "mongo connection error"))

app.set("views", path.join(__dirname, "..", "views"))
app.set("view engine", "pug")

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(compression())
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
)

// simplifing how we access user variable
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

// Passport Middleware
app.use(session({ secret: endpoints.SESSION_SECRET, resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")))
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.currentUser = req.user
  next()
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
