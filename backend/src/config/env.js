import dotenv from "dotenv";
dotenv.config();

export const env = () => ({
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  POSTGRES_URL: process.env.POSTGRES_URL,
  MONGO_URL: process.env.MONGO_URL,
  REDIS_URL: process.env.REDIS_URL,
  CLIENT_URL: process.env.CLIENT_URL
});