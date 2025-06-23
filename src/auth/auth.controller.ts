import { Body, Controller, Get, Post } from '@nestjs/common';
import { Authservice } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservices: Authservice) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authservices.signup(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authservices.login(body);
  }
}
