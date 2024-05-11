import { MigrationInterface, QueryRunner } from "typeorm";

export class User1715282857529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE "user" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP without time zone DEFAULT now() NOT NULL,
                updated_at TIMESTAMP without time zone DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public."user"
        `);
    }

}
