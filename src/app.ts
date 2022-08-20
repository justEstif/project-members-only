import express, { Express } from "express";
import endpoints from "./endpoints.config";
import path from "path";
import favicon from "serve-favicon";
import { connect, connection } from "mongoose";
import compression from "compression";
import helmet from "helmet";

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compression());

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));

connect(endpoints.MONGO_URL);
connection.on("error", console.error.bind(console, "mongo connection error"));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
