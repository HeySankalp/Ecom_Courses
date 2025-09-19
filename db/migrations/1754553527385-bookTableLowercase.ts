import { MigrationInterface, QueryRunner } from "typeorm";

export class BookTableLowercase1754553527385 implements MigrationInterface {
    name = 'BookTableLowercase1754553527385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "author" character varying(100), "isbn" character varying(50), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "class_id" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_7353c95667011f07248e1b0b71b" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_7353c95667011f07248e1b0b71b"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
