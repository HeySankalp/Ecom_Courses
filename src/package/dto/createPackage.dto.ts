import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createPackageDto {
    @ApiProperty({ example: '' })
    @IsNotEmpty()
    class_id: number;

    @ApiProperty({ example: '' })
    @IsNotEmpty()
    products: { productId: number; quantity: number }[];

    @ApiProperty({ example: 'UKG bundle' })
    @IsNotEmpty()
    packageName: string;
}
