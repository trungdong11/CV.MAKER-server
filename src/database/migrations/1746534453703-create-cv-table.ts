import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCvTable1746534453703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cv" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP,
                "updated_at" TIMESTAMP,
                "summary" character varying,
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_cv" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "personal_details" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "full_name" character varying,
                "phone_number" character varying,
                "address" character varying,
                "birthday" TIMESTAMP,
                "email" character varying,
                "avatar" character varying,
                "job_title" character varying,
                "cv_id" uuid,
                CONSTRAINT "PK_personal_details" PRIMARY KEY ("id"),
                CONSTRAINT "FK_personal_details_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "socials" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "icon" character varying,
                "link" character varying,
                "cv_id" uuid,
                CONSTRAINT "PK_socials" PRIMARY KEY ("id"),
                CONSTRAINT "FK_socials_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "education" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "degree" character varying,
                "school" character varying,
                "start_date" TIMESTAMP,
                "end_date" TIMESTAMP,
                "school_link" character varying,
                "city" character varying,
                "gpa" numeric,
                "description" character varying,
                "cv_id" uuid,
                CONSTRAINT "PK_education" PRIMARY KEY ("id"),
                CONSTRAINT "FK_education_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "award" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "award_title" character varying,
                "description" character varying,
                "award_title_link" character varying,
                "issued_by" character varying,
                "issued_date" TIMESTAMP,
                "cv_id" uuid,
                CONSTRAINT "PK_award" PRIMARY KEY ("id"),
                CONSTRAINT "FK_award_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "language" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "language" character varying,
                "proficiency" character varying,
                "cv_id" uuid,
                CONSTRAINT "PK_language" PRIMARY KEY ("id"),
                CONSTRAINT "FK_language_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "skill" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "skill_category" character varying,
                "list_of_skill" character varying,
                "cv_id" uuid,
                CONSTRAINT "PK_skill" PRIMARY KEY ("id"),
                CONSTRAINT "FK_skill_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "work" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "company_name" character varying,
                "position" character varying,
                "start_date" TIMESTAMP,
                "end_date" TIMESTAMP,
                "location" character varying,
                "description" character varying,
                "is_current_working" boolean,
                "cv_id" uuid,
                CONSTRAINT "PK_work" PRIMARY KEY ("id"),
                CONSTRAINT "FK_work_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "project" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "project_name" character varying,
                "description" character varying,
                "start_date" TIMESTAMP,
                "end_date" TIMESTAMP,
                "project_link" character varying,
                "is_ongoing" boolean,
                "cv_id" uuid,
                CONSTRAINT "PK_project" PRIMARY KEY ("id"),
                CONSTRAINT "FK_project_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "certification" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "certification_name" character varying,
                "issuing_organization" character varying,
                "issued_date" TIMESTAMP,
                "certification_link" character varying,
                "credential_id" character varying,
                "cv_id" uuid,
                CONSTRAINT "PK_certification" PRIMARY KEY ("id"),
                CONSTRAINT "FK_certification_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "publication" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying,
                "description" character varying,
                "publication_date" TIMESTAMP,
                "publisher" character varying,
                "url" character varying,
                "cv_id" uuid,
                CONSTRAINT "PK_publication" PRIMARY KEY ("id"),
                CONSTRAINT "FK_publication_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "organization" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                "position" character varying,
                "start_date" TIMESTAMP,
                "end_date" TIMESTAMP,
                "description" character varying,
                "cv_id" uuid,
                CONSTRAINT "PK_organization" PRIMARY KEY ("id"),
                CONSTRAINT "FK_organization_cv" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "publication"`);
        await queryRunner.query(`DROP TABLE "certification"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "work"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "award"`);
        await queryRunner.query(`DROP TABLE "education"`);
        await queryRunner.query(`DROP TABLE "socials"`);
        await queryRunner.query(`DROP TABLE "personal_details"`);
        await queryRunner.query(`DROP TABLE "cv"`);
    }

}