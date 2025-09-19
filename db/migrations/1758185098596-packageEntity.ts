import { MigrationInterface, QueryRunner } from "typeorm";

export class PackageEntity1758185098596 implements MigrationInterface {
    name = 'PackageEntity1758185098596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "package" ("id" SERIAL NOT NULL, "classId" integer NOT NULL, "productIds" integer array NOT NULL, "packageName" character varying NOT NULL, CONSTRAINT "PK_308364c66df656295bc4ec467c2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "package"`);
    }

}
