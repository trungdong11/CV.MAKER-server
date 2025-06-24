import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEvaluateTables1746534453704 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "evaluate" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name_cv" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "total_content_score" double precision NOT NULL,
                "total_final_score" double precision NOT NULL,
                "content_score_100" double precision NOT NULL,
                "final_score_100" double precision NOT NULL,
                "total_grammar_errors" integer NOT NULL,
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_evaluate" PRIMARY KEY ("id"),
                CONSTRAINT "FK_evaluate_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "evaluate_section" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "section" character varying NOT NULL,
                "content_score" double precision NOT NULL,
                "final_score" double precision NOT NULL,
                "grammar_errors" jsonb NOT NULL,
                "grammar_errors_detailed" jsonb,
                "suggestions" jsonb,
                "quality" character varying NOT NULL,
                "evaluate_id" uuid NOT NULL,
                CONSTRAINT "PK_evaluate_section" PRIMARY KEY ("id"),
                CONSTRAINT "FK_evaluate_section_evaluate" FOREIGN KEY ("evaluate_id") REFERENCES "evaluate"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "grammar_error" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "location" character varying,
                "type" character varying,
                "description" character varying,
                "suggestion" character varying,
                "evaluate_section_id" uuid NOT NULL,
                CONSTRAINT "PK_grammar_error" PRIMARY KEY ("id"),
                CONSTRAINT "FK_grammar_error_evaluate_section" FOREIGN KEY ("evaluate_section_id") REFERENCES "evaluate_section"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "suggestion" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "issue" character varying,
                "suggestion" character varying,
                "evaluate_section_id" uuid NOT NULL,
                CONSTRAINT "PK_suggestion" PRIMARY KEY ("id"),
                CONSTRAINT "FK_suggestion_evaluate_section" FOREIGN KEY ("evaluate_section_id") REFERENCES "evaluate_section"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "suggestion"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "grammar_error"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "evaluate_section"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "evaluate"`);
    }
} 