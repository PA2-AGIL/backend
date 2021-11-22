import { MigrationInterface, QueryRunner } from 'typeorm';

export class Answer1637604257547 implements MigrationInterface {
  name = 'Answer1637604257547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "owner" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "answer"`);
  }
}
