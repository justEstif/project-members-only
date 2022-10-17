import app from "./app";
import env from "./config/env";

console.log(process.env.port)
const port = env.PORT;

app.listen(port, () => {
  console.log(`express listening at http://localhost:${port}/api`);
});
