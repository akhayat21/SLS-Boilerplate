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
const getReference = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(400).json({ message: "Missing Reference id." });
    }
    try {
        const reference = yield reference_1.default.getReference(req.params.id);
        if (!reference) {
            return res.status(404).json({ message: "Reference not found." });
        }
        return res.status(200).json({ reference: reference });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.default = getReference;
//# sourceMappingURL=get-reference.js.map