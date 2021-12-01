import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../question/question';

@Entity()
export class File extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  fileName: string;

  @ApiProperty()
  @Column()
  url: string;

  @ManyToOne(() => Question, (question) => question.files)
  question: Question;
}
