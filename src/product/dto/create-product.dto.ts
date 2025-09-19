import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { title } from 'process';
import { ProductTypeEnum } from 'src/Enums/ProductEnumClass';

export class CreateProductDto {
  @ApiProperty({ example: 'social scince' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '1',
    description: '1 for books and 2 for stationary',
    enum: ['1', '2'],
  })
  @IsNotEmpty()
  @IsIn(['1', '2'], { message: 'productType must be either 1 or 2' })
  productType: string;

  @ApiProperty({ example: 190 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty({ message: 'title name is required for book' })
  @ValidateIf((payload) => payload.productType === ProductTypeEnum['BOOKS'])
  title: string;

  @ApiProperty({ example: 'enter author name', nullable: true })
  @IsString()
  @ValidateIf((payload) => payload.productType === ProductTypeEnum['BOOKS'])
  author: string;

  @ApiProperty({ example: 'enter universal book no.', nullable: true })
  @IsString()
  @ValidateIf((payload) => payload.productType === ProductTypeEnum['BOOKS'])
  isbn: string;

  @ApiProperty({ example: 'enter class' })
  @IsString()
  @ValidateIf((payload) => payload.productType === ProductTypeEnum['BOOKS'])
  class: string;
}
