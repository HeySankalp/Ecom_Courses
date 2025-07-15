import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type productType = "1" | "2";
@Entity('stationary')
export class Stationary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'enum', enum: ['1', '2'], })
    productType: productType;

    @Column()
    refId: number;

    @Column({ type: "numeric", precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
