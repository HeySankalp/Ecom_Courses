import { Injectable } from '@nestjs/common';
import { createPackageDto } from './dto/createPackage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/product/entities/class.entity';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackageService {
    constructor(
        @InjectRepository(Class)
        private classTable: Repository<Class>,
        @InjectRepository(Product)
        private productTable: Repository<Product>,
    ) { }

    getPackages() {
        return {
            message: 'List of packages',
            packages: [],
        };
    }

    createPackage(payload: createPackageDto) {

        const { class_id, packageName, products } = payload;

        

        return {
            message: 'Package created successfully',
            package: {},
        };
    }
}
