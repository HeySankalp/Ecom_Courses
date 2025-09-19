import { MigrationInterface, QueryRunner } from "typeorm";

export class BookAndStationaryChange1754476099345 implements MigrationInterface {
    name = 'BookAndStationaryChange1754476099345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Book" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "productType" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "productType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Book" ADD "price" numeric(10,2) NOT NULL`);
    }

}
