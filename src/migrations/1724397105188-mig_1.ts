import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig11724397105188 implements MigrationInterface {
    name = 'Mig11724397105188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountId" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, "balance" numeric NOT NULL, "status" character varying(255) NOT NULL DEFAULT 'PENDING', "isSoftDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_03220d8b0ebb79b008b6ec15b3e" UNIQUE ("accountId"), CONSTRAINT "REL_3aa23c0a6d107393e8b40e3e2a" UNIQUE ("userId"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(30) NOT NULL DEFAULT 'USERS', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(255) NOT NULL, "amount" numeric NOT NULL, "status" character varying(255) NOT NULL DEFAULT 'SUCCESS', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "accountId" uuid, CONSTRAINT "REL_26d8aec71ae9efbe468043cd2b" UNIQUE ("accountId"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
    }

}
