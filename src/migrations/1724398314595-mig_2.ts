import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig21724398314595 implements MigrationInterface {
    name = 'Mig21724398314595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "isLocked" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "isLocked"`);
    }

}
