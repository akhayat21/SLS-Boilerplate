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
const reference_1 = __importDefault(require("../../services/reference"));
const createReference = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newReference;
    try {
        yield reference_1.default.validateReference(req.body.url);
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
    try {
        newReference = yield reference_1.default.createReference(req.body.url);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
    try {
        yield reference_1.default.sendReferenceToQueue(newReference);
    }
    catch (error) {
        return res.status(202).json({
            reference: newReference,
            message: "Reference created succesfully but error sending reference to process result immediatly. The result may be scheduled and processed later.",
        });
    }
    return res.status(200).json({ reference: newReference });
});
exports.default = createReference;
//# sourceMappingURL=create-reference.js.map