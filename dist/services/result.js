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
const db_1 = __importDefault(require("../utils/db"));
const entities_1 = require("../entities");
const reference_1 = __importDefault(require("./reference"));
class ResultService {
    /**
     * @param {string} referenceId - the url the reference will refer to and gather results from
     *
     * @returns {Promise<InsertResult>} Returns a promise that will resolve with the created Reference object
     */
    insertResult(referenceId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Another workaround for typeorm relations, this should be done within a single database call
             */
            const reference = yield reference_1.default.getReference(referenceId);
            if (!reference) {
                throw new Error(`Reference with id "${referenceId}" does not exist`);
            }
            const AppDataSource = yield (0, db_1.default)();
            const result = AppDataSource.manager.create(entities_1.Result, {
                data,
            });
            result.reference = reference;
            yield AppDataSource.manager.insert(entities_1.Result, result);
            return result;
        });
    }
}
exports.default = new ResultService();
//# sourceMappingURL=result.js.map