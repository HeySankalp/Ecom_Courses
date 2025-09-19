import { ProductTypeEnum } from 'src/Enums/ProductEnumClass';
import { PackageProduct } from 'src/package/entities/packageProduct.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'enum', enum: ProductTypeEnum, nullable: true })
  productType: ProductTypeEnum;

  @Column({ nullable: true })
  refId: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'numeric', default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PackageProduct, (pp) => pp.product)
  packageProducts: PackageProduct[];
}
