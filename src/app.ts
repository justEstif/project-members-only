import express, { Express } from "express"
import endpoints from "./endpoints.config"
import path from "path"
import favicon from "serve-favicon"
import mongoose from "mongoose"

const app: Express = express()
const port = process.env.PORT || 3000

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// view engine setup
app.set("views", path.join(__dirname, "..", "views"))
app.set("view engine", "pug")

// serve favicon
app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")))

mongoose.connect(endpoints.MONGO_URL)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
