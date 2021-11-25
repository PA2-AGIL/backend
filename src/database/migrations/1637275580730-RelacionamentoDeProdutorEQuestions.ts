import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelacionamentoDeProdutorEQuestions1637275580730
  implements MigrationInterface
{
  name = 'RelacionamentoDeProdutorEQuestions1637275580730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "producer" ADD "quetionsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "FK_972b07b65bbe5e03ffacc58ce3a" FOREIGN KEY ("quetionsId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "FK_972b07b65bbe5e03ffacc58ce3a"`,
    );
    await queryRunner.query(`ALTER TABLE "producer" DROP COLUMN "quetionsId"`);
  }
}
