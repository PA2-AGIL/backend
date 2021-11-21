import { MigrationInterface, QueryRunner } from 'typeorm';

export class O2MProducerQuestions1637501550167 implements MigrationInterface {
  name = 'O2MProducerQuestions1637501550167';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "FK_972b07b65bbe5e03ffacc58ce3a"`,
    );
    await queryRunner.query(`ALTER TABLE "producer" DROP COLUMN "quetionsId"`);
    await queryRunner.query(`ALTER TABLE "question" ADD "producerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_f2623e06eb9dc5410ac55e56760" FOREIGN KEY ("producerId") REFERENCES "producer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_f2623e06eb9dc5410ac55e56760"`,
    );
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "producerId"`);
    await queryRunner.query(`ALTER TABLE "producer" ADD "quetionsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "FK_972b07b65bbe5e03ffacc58ce3a" FOREIGN KEY ("quetionsId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
