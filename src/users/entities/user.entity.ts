import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsDate,
  IsBoolean,
  IsEmail,
} from 'class-validator';
import { Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @Unique(['email'])
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column({ default: new Date() })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @Column({ default: new Date() })
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @Column({ default: new Date() })
  @IsDate()
  deletedAt: Date;

  @Column({ default: true })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
