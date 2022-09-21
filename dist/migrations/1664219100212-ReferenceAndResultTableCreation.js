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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceAndResultTableCreation1664219100212 = void 0;
class ReferenceAndResultTableCreation1664219100212 {
    constructor() {
        this.name = "ReferenceAndResultTableCreation1664219100212";
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "result" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0), "reference_id" integer, CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE INDEX "IX_result_created_at" ON "result" ("created_at") `);
            yield queryRunner.query(`CREATE TABLE "reference" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0), CONSTRAINT "PK_01bacbbdd90839b7dce352e4250" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE INDEX "IX_reference_created_at" ON "reference" ("created_at") `);
            yield queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_2a2479983ba1d0cf596c26f86b0" FOREIGN KEY ("reference_id") REFERENCES "reference"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_2a2479983ba1d0cf596c26f86b0"`);
            yield queryRunner.query(`DROP INDEX "public"."IX_reference_created_at"`);
            yield queryRunner.query(`DROP TABLE "reference"`);
            yield queryRunner.query(`DROP INDEX "public"."IX_result_created_at"`);
            yield queryRunner.query(`DROP TABLE "result"`);
        });
    }
}
exports.ReferenceAndResultTableCreation1664219100212 = ReferenceAndResultTableCreation1664219100212;
//# sourceMappingURL=1664219100212-ReferenceAndResultTableCreation.js.map