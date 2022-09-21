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
const reference_1 = __importDefault(require("../services/reference"));
module.exports.handler = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const references = yield reference_1.default.getAllReferences();
    for (const reference of references) {
        try {
            yield reference_1.default.sendReferenceToQueue(reference);
        }
        catch (error) {
            // log error to logging service
            console.error(error);
            continue;
        }
    }
    return callback(null, true);
});
//# sourceMappingURL=schedule-process-reference.js.map