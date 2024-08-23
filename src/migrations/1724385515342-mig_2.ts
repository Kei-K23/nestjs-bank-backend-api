import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig21724385515342 implements MigrationInterface {
    name = 'Mig21724385515342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "isSoftDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "isSoftDeleted"`);
    }

}