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

  @Column()
  @IsNotEmpty()
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

  @Column({ nullable: true, default: null })
  deletedAt: Date | null;

  @Column({ default: true })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
