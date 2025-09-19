import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangesAfterProductApi1754546834511 implements MigrationInterface {
    name = 'ChangesAfterProductApi1754546834511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "refId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "refId" SET NOT NULL`);
    }

}
