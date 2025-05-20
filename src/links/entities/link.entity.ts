import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  shortedUrl: string;
}
