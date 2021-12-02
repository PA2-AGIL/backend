import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from '../question/question';
import { User } from '../user';

@Entity()
export class Producer extends User {
  @OneToMany(() => Question, (question) => question.producer)
  questions: Question[];
}
