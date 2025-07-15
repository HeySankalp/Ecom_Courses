import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Classes } from "./class.entity";


@Entity('Books')
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    author: string;

    @Column({
        type: 'numeric',
        precision: 10,
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        },
    })
    price: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    isbn: string;

    @ManyToOne(() => Classes, classEntity => classEntity.books, { nullable: true })
    @JoinColumn({ name: 'class_id' })
    class: Classes;

    @CreateDateColumn()
    createdAt: Date;
}