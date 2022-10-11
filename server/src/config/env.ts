import { cleanEnv, port, num, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port({ default: 4200 }),
  SALTWORKFACTOR: num({ default: 10 }),
  JWTSECRET: str(),
});

export default env;
