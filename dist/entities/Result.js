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
const Reference_1 = __importDefault(require("./Reference"));
let Result = class Result {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id", unsigned: true }),
    __metadata("design:type", Number)
], Result.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Reference_1.default, (reference) => reference.id, {
        cascade: true,
        onDelete: "CASCADE",
        orphanedRowAction: "soft-delete",
    }),
    (0, typeorm_1.JoinColumn)({ name: "reference_id", referencedColumnName: "id" }),
    __metadata("design:type", Reference_1.default)
], Result.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Object)
], Result.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Index)("IX_result_created_at"),
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Result.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: "timestamp",
        precision: 0,
        nullable: true,
    }),
    __metadata("design:type", Date)
], Result.prototype, "deleted_at", void 0);
Result = __decorate([
    (0, typeorm_1.Entity)({ name: "result" })
], Result);
exports.default = Result;
//# sourceMappingURL=Result.js.map