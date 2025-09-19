import { MigrationInterface, QueryRunner } from "typeorm";

export class Firstmigration1754141210810 implements MigrationInterface {
    name = 'Firstmigration1754141210810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stationary" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "type" character varying(50), "price" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_533a3ed97c636a03ccbc3f2d375" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_producttype_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "productType" "public"."products_producttype_enum" NOT NULL, "refId" integer NOT NULL, "price" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Book" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "author" character varying(100), "price" numeric(10,2) NOT NULL, "isbn" character varying(50), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "class_id" integer, CONSTRAINT "PK_1cd110bae01e3fa29a83eeedba8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_574dd394846fb85d495d0f77dfd" UNIQUE ("name"), CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "phone" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Book" ADD CONSTRAINT "FK_902bae982fdb4a13965ba4b13d4" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Book" DROP CONSTRAINT "FK_902bae982fdb4a13965ba4b13d4"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "Book"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_producttype_enum"`);
        await queryRunner.query(`DROP TABLE "stationary"`);
    }

}
