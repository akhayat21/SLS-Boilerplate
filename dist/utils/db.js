"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
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
const getOrInitDataSource = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!exports.AppDataSource.isInitialized) {
        yield exports.AppDataSource.initialize();
    }
    return exports.AppDataSource;
});
exports.default = getOrInitDataSource;
//# sourceMappingURL=db.js.map