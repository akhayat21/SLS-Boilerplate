import { MigrationInterface, QueryRunner } from "typeorm";

export class ReferenceAndResultTableCreation1664219100212
  implements MigrationInterface
{
  name = "ReferenceAndResultTableCreation1664219100212";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "result" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0), "reference_id" integer, CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_result_created_at" ON "result" ("created_at") `
    );
    await queryRunner.query(
      `CREATE TABLE "reference" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP(0), CONSTRAINT "PK_01bacbbdd90839b7dce352e4250" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_reference_created_at" ON "reference" ("created_at") `
    );
    await queryRunner.query(
      `ALTER TABLE "result" ADD CONSTRAINT "FK_2a2479983ba1d0cf596c26f86b0" FOREIGN KEY ("reference_id") REFERENCES "reference"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "result" DROP CONSTRAINT "FK_2a2479983ba1d0cf596c26f86b0"`
    );
    await queryRunner.query(`DROP INDEX "public"."IX_reference_created_at"`);
    await queryRunner.query(`DROP TABLE "reference"`);
    await queryRunner.query(`DROP INDEX "public"."IX_result_created_at"`);
    await queryRunner.query(`DROP TABLE "result"`);
  }
}
