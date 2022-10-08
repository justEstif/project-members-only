import express, { urlencoded, json } from "express";
import router from "./routes";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/", router);
export default app
