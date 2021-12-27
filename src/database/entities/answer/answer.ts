import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from '../question/question';

@Entity()
export class Answer extends BaseEntity {
  @ApiProperty()
  @ObjectIdColumn()
  id: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column({ nullable: false })
  ownerId: string;

  @ApiProperty()
  @Column()
  isExpert: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
