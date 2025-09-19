import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Class } from 'src/product/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Class])],
  providers: [PackageService],
  controllers: [PackageController],
})
export class PackageModule {}
