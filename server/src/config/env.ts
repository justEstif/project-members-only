import { cleanEnv, port, num } from "envalid";

const env = cleanEnv(process.env, {
  port: port({ default: 4200 }),
  saltWorkFactor: num({ default: 10 }),
});

export default env;
