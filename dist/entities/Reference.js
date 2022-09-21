"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Result_1 = __importDefault(require("./Result"));
let Reference = class Reference {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id", unsigned: true }),
    __metadata("design:type", Number)
], Reference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Reference.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Result_1.default, (result) => result.reference),
    __metadata("design:type", Array)
], Reference.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.Index)("IX_reference_created_at"),
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Reference.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: "timestamp",
        precision: 0,
        nullable: true,
    }),
    __metadata("design:type", Date)
], Reference.prototype, "deleted_at", void 0);
Reference = __decorate([
    (0, typeorm_1.Entity)({ name: "reference" })
], Reference);
exports.default = Reference;
//# sourceMappingURL=Reference.js.map