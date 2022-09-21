import dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  applicationName: "ReferenceApiV1",
  type: "postgres",
  host: process.env.PSQL_HOST,
  port: parseInt(process.env.PSQL_PORT || "5432"),
  database: process.env.PSQL_DB,
  username: process.env.PSQL_USER,
  password: process.env.PSQL_PASS,
  entities: ["dist/entities/*.{js,ts}"],
  migrations: ["dist/migrations/*.{js,ts}"],
  subscribers: [],
  migrationsTableName: "migration_table",
});

const getOrInitDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};

export default getOrInitDataSource;