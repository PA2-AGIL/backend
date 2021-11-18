import { MigrationInterface, QueryRunner } from 'typeorm';

export class ColunaClosedFalse1637256054000 implements MigrationInterface {
  name = 'ColunaClosedFalse1637256054000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "closed" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "closed" DROP DEFAULT`,
    );
  }
}
