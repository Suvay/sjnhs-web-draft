import { z } from 'zod';

/**
 * Environment variable validation schema
 * Ensures all required environment variables are present and valid
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  
  // MongoDB Configuration
  MONGODB_CONNECTION_STRING: z.string().default('mongodb://localhost:27017/admin-dashboard'),
  
  // Session and Authentication
  SESSION_SECRET: z.string().default('your-session-secret-change-in-production'),
  JWT_SECRET: z.string().default('your-jwt-secret-change-in-production'),
  
  // PostgreSQL (existing database)
  DATABASE_URL: z.string().optional(),
});

/**
 * Parse and validate environment variables
 * Throws an error if required variables are missing or invalid
 */
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    process.exit(1);
  }
}

/**
 * Validated environment configuration
 * Use this throughout the application instead of process.env
 */
export const env = validateEnv();

/**
 * Check if running in development mode
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = env.NODE_ENV === 'production';