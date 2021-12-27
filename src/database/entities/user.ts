import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export class User extends BaseEntity {
  @ApiProperty()
  @ObjectIdColumn()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  profilePicture: string;

  @Column()
  salt: string;

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
