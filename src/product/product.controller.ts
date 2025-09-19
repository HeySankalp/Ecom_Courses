import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('list')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return this.productService.findProductById(+id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}
