import app from "./app";
import env from "./config/env";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const port = env.PORT;

app.listen(port, () => {
  console.log(`express listening at http://localhost:${port}/api`);
});
