import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Unique } from 'typeorm';
import { User } from '../user';
@Entity()
@Unique(['email'])
export class Expert extends User {
  @ApiProperty()
  @Column()
  type: string;
}
