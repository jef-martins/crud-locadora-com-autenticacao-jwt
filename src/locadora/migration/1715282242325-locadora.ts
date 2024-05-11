import { MigrationInterface, QueryRunner } from "typeorm";

export class Locadora1715282242325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE films (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                sinopse TEXT NOT NULL,
                director VARCHAR(255) NOT NULL,
                actors TEXT,
                release_date DATE NOT NULL,
                created_at TIMESTAMP without time zone DEFAULT now() NOT NULL,
                updated_at TIMESTAMP without time zone DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.films
        `);
    }

}
