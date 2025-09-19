import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { ProductTypeEnum } from 'src/Enums/ProductEnumClass';
import { Class } from './entities/class.entity';
import { log } from 'console';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productTable: Repository<Product>,
    @InjectRepository(Book)
    private bookTable: Repository<Book>,
    @InjectRepository(Class)
    private classTable: Repository<Class>,
  ) {}

  async createProduct(payload: CreateProductDto) {
    const { name, price, productType } = payload;
    const productTable = this.productTable;
    let savedProductType;

    if (ProductTypeEnum['BOOKS'] == productType) {
      const classEntity = await this.classTable.findOneBy({
        name: payload.class,
      });

      if (classEntity) {
        const newProductType = this.bookTable.create({
          author: payload.author,
          class: classEntity,
          isbn: payload.isbn,
          title: payload.title,
        });

        savedProductType = await this.bookTable.save(newProductType);
      } else {
        throw new NotFoundException({
          message: `Class not found for this book please create class ${payload.class}`,
        });
      }
    }

    const newProduct = this.productTable.create({
      ...payload,
      refId: savedProductType?.id || null,
      productType: productType as ProductTypeEnum,
    });
    const savedProduct = await this.productTable.save(newProduct);
    return {
      message: 'Product successfully saved',
      data: savedProduct,
    };
  }

  async findAll() {
    const listAllProducts = await this.productTable.find();

    return {
      message: 'Fetched all products',
      data: listAllProducts,
    };
  }

  async findProductById(id: number) {
    const product = await this.productTable.findBy({
      id: id,
    });

    console.log(product);

    if (product.length)
      return {
        statusCode: 200,
        message: 'Product succesfully fetched',
        data: product,
      };
    else throw new NotFoundException('Product not found');
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    let productItem;
    let bookItem;
    let newProductItem;

    if (!id) return;

    try {
      productItem = await this.productTable.findOne({
        where: { id },
      });

      if (
        productItem?.productType == ProductTypeEnum['BOOKS'] &&
        productItem.refId
      ) {
        bookItem = await this.bookTable.findOne({
          where: { id: productItem.refId },
        });
      }

      if (updateProductDto.productType == ProductTypeEnum['BOOKS']) {
        const classEntity = await this.classTable.findOneBy({
          name: updateProductDto.class,
        });
        if (classEntity) {
          const newBookItem = await this.bookTable.update(productItem.refId, {
            author: updateProductDto.author,
            class: classEntity,
            isbn: updateProductDto.isbn,
            title: updateProductDto.title,
          });
        }
      }

      newProductItem = await this.productTable.update(id, {
        name: updateProductDto.name,
        price: updateProductDto.price,
        stock: updateProductDto.stock,
        productType: updateProductDto.productType as ProductTypeEnum,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: err.message || err,
      });
    }

    return {
      message: 'Product successfully updated',
      data: updateProductDto,
    };
  }

  async deleteProduct(id: number) {
    const productItem = await this.productTable.findOneBy({ id });

    if (!productItem)
      throw new NotFoundException({
        message: `the product with id ${id} not found`,
      });

    try {
      if (
        productItem?.productType == ProductTypeEnum['BOOKS'] &&
        productItem.refId
      ) {
        const bookEntity = await this.bookTable.findOneBy({
          id: productItem.refId,
        });
        if (bookEntity) {
          await this.bookTable.remove(bookEntity);
        }
        await this.productTable.remove(productItem);

        return {
          status: 200,
          message: `Product item with id ${id} deleted successfully`,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message || error,
      });
    }
  }
}
