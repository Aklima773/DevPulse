
import { neon } from "@neondatabase/serverless";
import config from "../config";


 if (!config.database_url) {
  throw new Error("DATABASE_URL is missing from your configuration file.");
}

 export const sql =neon(config.database_url)

export const initDB = async () => {
  // 1. Create Users Table
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(75) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      passwordhash TEXT NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'contributor',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW() 
    )
  `;

  // 2. Create issues Table
 await sql`
  CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL CHECK (char_length(description) >= 20),
    type VARCHAR(20) NOT NULL CHECK (type IN ('bug', 'feature_request')),
    status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
    reporter_id INT NOT NULL, -- Application logic will handle validation; no FK constraint mapping.
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`

  console.log("Database Connected!")
};