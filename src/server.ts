import app from "./app";
import env from "./config/env";
import * as dotenv from "dotenv";

dotenv.config();

const port = env.PORT;

app.listen(port, () => {
  console.log(`express listening at http://localhost:${port}/api`);
});
