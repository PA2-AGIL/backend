import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailUnique1638905059556 implements MigrationInterface {
  name = 'EmailUnique1638905059556';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "UQ_709db7a116db3e824f44e363ae6" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "expert" ADD CONSTRAINT "UQ_360b7b5c285fceedc0bfcb4a6b2" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expert" DROP CONSTRAINT "UQ_360b7b5c285fceedc0bfcb4a6b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "UQ_709db7a116db3e824f44e363ae6"`,
    );
  }
}
