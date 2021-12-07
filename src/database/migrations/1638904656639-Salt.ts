import { MigrationInterface, QueryRunner } from 'typeorm';

export class Salt1638904656639 implements MigrationInterface {
  name = 'Salt1638904656639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer" ADD "salt" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expert" ADD "salt" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expert" DROP COLUMN "salt"`);
    await queryRunner.query(`ALTER TABLE "producer" DROP COLUMN "salt"`);
  }
}
