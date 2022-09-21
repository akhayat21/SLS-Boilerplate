"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reference_1 = __importDefault(require("./reference"));
function useRoutes(server) {
    server.use("/v1", reference_1.default);
}
exports.default = useRoutes;
//# sourceMappingURL=index.js.map