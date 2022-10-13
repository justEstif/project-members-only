import express, { urlencoded, json } from "express";
import passport from "passport";
import { jwtStrategy, localStrategy } from "./config/passport";
import router from "./routes";

const app = express();

// body parser
app.use(json());
app.use(urlencoded({ extended: false }));

// passport
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api", router);

export default app;
