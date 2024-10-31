import { z } from "zod";

const envSchema = z.object({
  // Environment
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  // Database
  DB_INVENTORY_NAME: z.string().default("movies"),
  DB_INVENTORY_USER: z.string().default("postgres"),
  DB_INVENTORY_PASSWORD: z.string().default("password"),
  DB_INVENTORY_HOST: z.string().default("localhost"),
  DB_INVENTORY_PORT: z.string().default("5432"),

  // App
  APP_INVENTORY_PORT: z.string().default("8080"),
});

export type Env = z.infer<typeof envSchema>;

export const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => err.path.join("."));
      throw new Error(
        `❌ Invalid environment variables: ${missingVars.join(", ")}`,
      );
    }
    throw error;
  }
};
