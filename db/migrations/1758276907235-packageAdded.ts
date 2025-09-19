import { MigrationInterface, QueryRunner } from "typeorm";

export class PackageAdded1758276907235 implements MigrationInterface {
    name = 'PackageAdded1758276907235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "package_products" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "packageId" integer, "productId" integer, CONSTRAINT "PK_54cd0286e36604e73b44500dc77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "package_products" ADD CONSTRAINT "FK_2e0e4fb2550eadd166c74c5aa60" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_products" ADD CONSTRAINT "FK_74cc589a71dab1a3689726aca3e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_products" DROP CONSTRAINT "FK_74cc589a71dab1a3689726aca3e"`);
        await queryRunner.query(`ALTER TABLE "package_products" DROP CONSTRAINT "FK_2e0e4fb2550eadd166c74c5aa60"`);
        await queryRunner.query(`DROP TABLE "package_products"`);
    }

}
