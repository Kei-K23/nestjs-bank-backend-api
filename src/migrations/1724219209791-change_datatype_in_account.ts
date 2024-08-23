import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDatatypeInAccount1724219209791 implements MigrationInterface {
    name = 'ChangeDatatypeInAccount1724219209791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
