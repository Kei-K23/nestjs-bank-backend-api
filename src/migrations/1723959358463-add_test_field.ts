import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTestField1723959358463 implements MigrationInterface {
    name = 'AddTestField1723959358463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "test" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
    }

}
