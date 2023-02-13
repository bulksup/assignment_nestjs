import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board-status.enum';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @Column()
  password: string;

  @Column()
  createAt: string;

  @Column()
  writer: string;

  @Column()
  likes: number;
}

@Entity()
export class Likes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  likes: number;
}
