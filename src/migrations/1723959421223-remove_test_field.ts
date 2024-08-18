import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTestField1723959421223 implements MigrationInterface {
    name = 'RemoveTestField1723959421223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "test" character varying(100) NOT NULL`);
    }

}
