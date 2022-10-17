import { object, string, number } from "zod";

const envSchema = object({
  PORT: number(),
  SALTWORKFACTOR: number(),
  JWTSECRET: string(),
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
