import { MigrationInterface, QueryRunner } from "typeorm";

export class Mytestmigration1723959883813 implements MigrationInterface {
    name = 'Mytestmigration1723959883813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "test" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
    }

}
