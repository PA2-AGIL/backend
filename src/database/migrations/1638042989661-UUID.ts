import { MigrationInterface, QueryRunner } from 'typeorm';

export class UUID1638042989661 implements MigrationInterface {
  name = 'UUID1638042989661';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_652375e5e4515bf89e755eaba1e"`,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "questionId"`);
    await queryRunner.query(`ALTER TABLE "file" ADD "questionId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_f2623e06eb9dc5410ac55e56760"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6"`,
    );
    await queryRunner.query(`ALTER TABLE "producer" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "producer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5"`,
    );
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "question" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "producerId"`);
    await queryRunner.query(`ALTER TABLE "question" ADD "producerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f"`,
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "answer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "questionId"`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "questionId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "expert" DROP CONSTRAINT "PK_461a4a90df7daf980d8b79bc3ce"`,
    );
    await queryRunner.query(`ALTER TABLE "expert" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "expert" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "expert" ADD CONSTRAINT "PK_0062630832658e718267ce2941f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_652375e5e4515bf89e755eaba1e" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_f2623e06eb9dc5410ac55e56760" FOREIGN KEY ("producerId") REFERENCES "producer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_f2623e06eb9dc5410ac55e56760"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_652375e5e4515bf89e755eaba1e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expert" DROP CONSTRAINT "PK_0062630832658e718267ce2941f"`,
    );
    await queryRunner.query(`ALTER TABLE "expert" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "expert" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "expert" ADD CONSTRAINT "PK_0062630832658e718267ce2941f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "questionId"`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "questionId" integer`);
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f"`,
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "producerId"`);
    await queryRunner.query(`ALTER TABLE "question" ADD "producerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5"`,
    );
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "question" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6"`,
    );
    await queryRunner.query(`ALTER TABLE "producer" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "producer" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_f2623e06eb9dc5410ac55e56760" FOREIGN KEY ("producerId") REFERENCES "producer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "questionId"`);
    await queryRunner.query(`ALTER TABLE "file" ADD "questionId" integer`);
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_652375e5e4515bf89e755eaba1e" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
