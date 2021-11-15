import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExpertType1637015370332 implements MigrationInterface {
  name = 'ExpertType1637015370332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expert" ADD "address" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expert" DROP COLUMN "address"`);
  }
}
