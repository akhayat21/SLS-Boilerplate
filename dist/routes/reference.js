"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reference_1 = require("../controllers/reference");
const router = express_1.default.Router();
router.get("/references", reference_1.getAllReferences);
router.post("/reference", reference_1.createReference);
router.get("/reference/:id", reference_1.getReference);
router.delete("/reference/:id", reference_1.deleteReference);
exports.default = router;
//# sourceMappingURL=reference.js.map