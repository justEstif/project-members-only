import express, { urlencoded, json } from "express";
import passport from "passport";
import { localStrategy } from "./config/passport";
import router from "./routes";

const app = express();

// body parser
app.use(json());
app.use(urlencoded({ extended: false }));

// passport
passport.use(localStrategy);

app.use("/api", router);

export default app;
