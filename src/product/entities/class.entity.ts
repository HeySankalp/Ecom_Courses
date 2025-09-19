import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './book.entity';

@Entity('class')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 50 })
  name: string;

  @OneToMany(() => Book, (book) => book.class)
  books: Book[];
}
