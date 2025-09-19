import { MigrationInterface, QueryRunner } from "typeorm";

export class DropStationary1754484184654 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("stationary");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
