import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUuid1724219455848 implements MigrationInterface {
    name = 'AddUuid1724219455848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_03220d8b0ebb79b008b6ec15b3e"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "accountId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_03220d8b0ebb79b008b6ec15b3e" UNIQUE ("accountId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_03220d8b0ebb79b008b6ec15b3e"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "accountId" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_03220d8b0ebb79b008b6ec15b3e" UNIQUE ("accountId")`);
    }

}
