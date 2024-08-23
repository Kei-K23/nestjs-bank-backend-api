import { MigrationInterface, QueryRunner } from "typeorm";

export class Mg21724383686809 implements MigrationInterface {
    name = 'Mg21724383686809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountId" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, "balance" numeric NOT NULL, "status" character varying(255) NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_03220d8b0ebb79b008b6ec15b3e" UNIQUE ("accountId"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(30) NOT NULL DEFAULT 'USERS', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
    }

}
