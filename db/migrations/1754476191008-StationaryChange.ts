import { MigrationInterface, QueryRunner } from "typeorm";

export class StationaryChange1754476191008 implements MigrationInterface {
    name = 'StationaryChange1754476191008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stationary" DROP COLUMN "price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stationary" ADD "price" numeric(10,2) NOT NULL`);
    }

}
