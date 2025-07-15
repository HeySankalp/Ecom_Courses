import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity('classes')
export class Classes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, length: 50 })
    name: string;

    @OneToMany(() => Book, book => book.class)
    books: Book[];

}
