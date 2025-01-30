import { Dialect } from "sequelize"; // Import Dialect type
import dotenv from "dotenv";

dotenv.config();


interface DBConfig {
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  port: string | undefined;
  host: string | undefined;
  dialect: Dialect; // Ensure dialect is of type Dialect
}

interface Config {
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}

const config: Config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: "null",
    database: "database_test",
    port: undefined,
    host: "127.0.0.1",
    dialect: "postgres", 
  },
  production: {
    username: "root",
    password: "null",
    database: "database_production",
    port: undefined,
    host: "127.0.0.1",
    dialect: "postgres",
  },
};

export default config;
