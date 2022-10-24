import { object, string } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const envSchema = object({
  PORT: string().transform(Number),
  SALTWORKFACTOR: string().transform(Number),
  JWTSECRET: string(),
  DATABASE_URL: string(),
  MEMBER_KEY: string(),
  ADMIN_KEY: string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(env.error.format(), null, 4)
  );
  process.exit(1);
}

export default env.data;
