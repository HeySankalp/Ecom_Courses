import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Authservice } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../common/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [Authservice],
})
export class AuthModule {}
