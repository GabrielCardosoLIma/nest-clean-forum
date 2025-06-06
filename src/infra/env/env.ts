import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  PORT: z.coerce.number().default(3333),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACESS_KEY_ID: z.string(),
  AWS_SECRET_ACESS_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
