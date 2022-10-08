import { cleanEnv, port } from "envalid";

const env = cleanEnv(process.env, {
  port: port({ default: 4200 }),
});

export default env;
