import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../answer/answer';
import { File } from '../file/file';
import { Producer } from '../producer/producer';

@Entity()
export class Question extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column({ default: false, nullable: false })
  closed: boolean;

  @ManyToOne(() => Producer, (producer) => producer.questions)
  producer: Producer;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @OneToMany(() => File, (file) => file.question, { lazy: true })
  files: File[];

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
