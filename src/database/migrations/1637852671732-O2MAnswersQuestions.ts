import { MigrationInterface, QueryRunner } from 'typeorm';

export class O2MAnswersQuestions1637852671732 implements MigrationInterface {
  name = 'O2MAnswersQuestions1637852671732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "answer" ADD "questionId" integer`);
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`,
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "questionId"`);
  }
}
