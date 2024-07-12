import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.string(),
  DATABASE_URL: z.string(),
});

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DATABASE_URL= process.env.DATABASE_URL;
 

const parsedResult = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DATABASE_URL
});

if (!parsedResult.success) {
  console.error(parsedResult.error);
  throw new Error("Invalid environment variables!");
}

export default parsedResult.data;
