import { Entity, OneToMany, Unique } from 'typeorm';
import { Question } from '../question/question';
import { User } from '../user';

@Entity()
@Unique(['email'])
export class Producer extends User {
  @OneToMany(() => Question, (question) => question.producer)
  questions: Question[];
}
