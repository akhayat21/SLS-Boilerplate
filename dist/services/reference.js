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
const joi_1 = __importDefault(require("joi"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const db_1 = __importDefault(require("../utils/db"));
const entities_1 = require("../entities");
const SQS_ACCESS_KEY_ID = process.env.PROCESS_REF_SQS_ACCESSKEYID;
const SQS_SECRET_ACCESS_KEY = process.env.PROCESS_REF_SQS_SECRETACCESSKEY;
const SQS_REGION = process.env.PROCESS_REF_SQS_REGION;
const SQS_API_VERSION = "2012-11-05";
const sqsClient = new aws_sdk_1.default.SQS({
    apiVersion: SQS_API_VERSION,
    region: SQS_REGION,
    accessKeyId: SQS_ACCESS_KEY_ID,
    secretAccessKey: SQS_SECRET_ACCESS_KEY,
});
const PROCESS_REFERENCE_QUEUE_URL = process.env.PROCESS_REF_SQS_URL;
class ReferenceService {
    constructor() {
        this.referenceValidator = joi_1.default.string()
            .uri({ allowQuerySquareBrackets: true })
            .required();
    }
    /**
     * @param {string} url - the url the reference will refer to and gather results from
     *
     * @returns {promise} Returns a promise that throws an error if validation fails
     */
    validateReference(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.referenceValidator.validateAsync(url);
        });
    }
    /**
     * @param {string} url - the url the reference will refer to and gather results from
     *
     * @returns {Promise<InsertResult>} Returns a promise that will resolve with the created Reference object
     */
    createReference(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const AppDataSource = yield (0, db_1.default)();
            const reference = AppDataSource.manager.create(entities_1.Reference, {
                url,
            });
            yield AppDataSource.manager.insert(entities_1.Reference, reference);
            return reference;
        });
    }
    /**
     * @param {string} id - the id of the reference in question
     *
     * @returns {Promise<Reference>} Returns a promise that will resolve with a Reference object if it exists
     */
    getReference(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const AppDataSource = yield (0, db_1.default)();
            return AppDataSource.manager.findOne(entities_1.Reference, {
                where: {
                    id: id,
                },
                relations: {
                    results: true,
                },
            });
        });
    }
    /**
     * @returns {Promise<Reference[]>} Returns a promise that will resolve with all Reference object if any exist
     */
    getAllReferences() {
        return __awaiter(this, void 0, void 0, function* () {
            const AppDataSource = yield (0, db_1.default)();
            return AppDataSource.manager.find(entities_1.Reference, {
                relations: {
                    results: true,
                },
            });
        });
    }
    /**
     * @param {string} id - the id of the reference in question
     *
     * @returns {Promise<Reference>} Returns a promise that will resolve with a Reference object if it exists
     */
    deleteReference(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * there seems to be a host of bugs when it comes to working with typeorm relations
             * below is a workaround for cascade deletes. This should be all done within a single database call
             * NOTE TO FUTURE DEVS: don't use typeorm
             */
            const AppDataSource = yield (0, db_1.default)();
            const results = yield AppDataSource.manager.find(entities_1.Result, {
                where: {
                    reference: {
                        id,
                    },
                },
            });
            if ((results === null || results === void 0 ? void 0 : results.length) > 0) {
                yield AppDataSource.manager.softDelete(entities_1.Result, results);
            }
            return AppDataSource.manager.softDelete(entities_1.Reference, {
                id,
            });
        });
    }
    /**
     * @param {Reference} reference - the reference object that needs to be processed
     *
     * @returns {Promise<any>} Returns a promise to send a message to a queue
     */
    sendReferenceToQueue(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageBody = JSON.stringify({ reference });
            return sqsClient
                .sendMessage({
                MessageBody: messageBody,
                QueueUrl: PROCESS_REFERENCE_QUEUE_URL,
            })
                .promise();
        });
    }
}
exports.default = new ReferenceService();
//# sourceMappingURL=reference.js.map