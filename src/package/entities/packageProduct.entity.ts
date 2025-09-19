import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Package } from "./package.entity";
import { Product } from "src/product/entities/product.entity";

@Entity('package_products')
export class PackageProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Package, (pkg) => pkg.packageProducts, { onDelete: 'CASCADE' })
    package: Package;

    @ManyToOne(() => Product, (pkg) => pkg.packageProducts, { onDelete: 'CASCADE' })
    product: Product;
}