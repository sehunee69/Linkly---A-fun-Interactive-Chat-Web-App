import pkg from "pg";
import { env } from "./env.js"

const { Pool } = pkg;
const { POSTGRES_URL } = env();

export const pgPool = new Pool({
    connectionString: POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});