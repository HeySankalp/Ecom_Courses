import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStockInProduct1754567835375 implements MigrationInterface {
    name = 'AddedStockInProduct1754567835375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "stock" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stock"`);
    }

}
