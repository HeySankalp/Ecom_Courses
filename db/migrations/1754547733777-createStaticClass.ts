import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStaticClass1754547733777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert classes from nursery to 12th grade
        await queryRunner.query(`
            INSERT INTO "class" ("name") VALUES
            ('Nursery'),
            ('LKG'),
            ('UKG'),
            ('First'),
            ('Second'),
            ('Third'),
            ('Fourth'),
            ('Fifth'),
            ('Sixth'),
            ('Seventh'),
            ('Eighth'),
            ('Ninth'),
            ('Tenth'),
            ('Eleventh'),
            ('Twelfth')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the inserted data
        await queryRunner.query(`
            DELETE FROM "class" WHERE "name" IN (
                'Nursery', 'LKG', 'UKG', 'First', 'Second', 'Third',
                'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth',
                'Ninth', 'Tenth', 'Eleventh', 'Twelfth'
            )
        `);
    }
}
