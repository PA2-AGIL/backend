import { MigrationInterface, QueryRunner } from 'typeorm';

export class O2MQuestionsFile1637937640152 implements MigrationInterface {
  name = 'O2MQuestionsFile1637937640152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "file" ADD "questionId" integer`);
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_652375e5e4515bf89e755eaba1e" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_652375e5e4515bf89e755eaba1e"`,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "questionId"`);
  }
}
