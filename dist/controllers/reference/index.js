"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReference = exports.getReference = exports.createReference = exports.getAllReferences = void 0;
const get_all_references_1 = __importDefault(require("./get-all-references"));
exports.getAllReferences = get_all_references_1.default;
const create_reference_1 = __importDefault(require("./create-reference"));
exports.createReference = create_reference_1.default;
const get_reference_1 = __importDefault(require("./get-reference"));
exports.getReference = get_reference_1.default;
const delete_reference_1 = __importDefault(require("./delete-reference"));
exports.deleteReference = delete_reference_1.default;
//# sourceMappingURL=index.js.map