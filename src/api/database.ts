import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const client: Pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.ENV === "test" ? process.env.DB_TEST : process.env.DB,
});

export default client;
