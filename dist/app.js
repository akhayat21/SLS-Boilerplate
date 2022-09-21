"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "2mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "2mb", extended: true }));
const PORT = process.env.PORT || 8080;
(0, routes_1.default)(app);
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map