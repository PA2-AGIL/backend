import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { User } from '../user';
@Entity()
export class Expert extends User {
  @ApiProperty()
  @Column()
  type: string;
}
