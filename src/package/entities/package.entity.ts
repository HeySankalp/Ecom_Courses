import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PackageProduct } from "./packageProduct.entity";


@Entity('package')
export class Package {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    classId : number;

    @Column('int', { array: true })
    productIds: number[];

    @Column()
    packageName: string;
    
    @OneToMany(()=> PackageProduct, (pp)=> pp.product)
    packageProducts: PackageProduct[];

}