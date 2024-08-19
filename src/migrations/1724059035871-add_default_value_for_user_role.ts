import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValueForUserRole1724059035871 implements MigrationInterface {
    name = 'AddDefaultValueForUserRole1724059035871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USERS'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
    }

}
