import { Controller, Get, Post } from '@nestjs/common';
import { PackageService } from './package.service';
import { createPackageDto } from './dto/createPackage.dto';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}
  @Get()
  getPackages() {
    return this.packageService.getPackages();
  }

  @Post()
  createPackage(payload: createPackageDto) {
    return this.packageService.createPackage(payload);
  }
}
