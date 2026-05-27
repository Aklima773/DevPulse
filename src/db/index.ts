
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
      passwordHash TEXT NOT NULL,
      age INT NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user',
      createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
      updatedAt TIMESTAMP NOT NULL DEFAULT NOW() -- <-- Removed the comma here
    )
  `;

  // 2. Create Orders Table
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,                     -- <-- Fixed typo: SECRIAL to SERIAL
      customerId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      quantity INT NOT NULL CHECK (quantity > 0),
      food TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,              -- <-- Fixed typo: NEUMERIC to NUMERIC
      createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
      updatedAt TIMESTAMP NOT NULL DEFAULT NOW() -- <-- Removed the comma here
    )
  `

  console.log("Database Connected!")
};