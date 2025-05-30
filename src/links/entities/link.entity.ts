import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsDate } from 'class-validator';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  @IsString()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  url: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  shortedUrl: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
