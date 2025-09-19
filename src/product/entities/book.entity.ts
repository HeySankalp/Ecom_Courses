import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from './class.entity';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  author: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  isbn: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.books, {
    nullable: true,
  })
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @CreateDateColumn()
  createdAt: Date;
}
