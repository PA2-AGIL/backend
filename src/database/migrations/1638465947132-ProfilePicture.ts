import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfilePicture1638465947132 implements MigrationInterface {
  name = 'ProfilePicture1638465947132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer" ADD "profilePicture" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expert" ADD "profilePicture" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expert" DROP COLUMN "profilePicture"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" DROP COLUMN "profilePicture"`,
    );
  }
}
