import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { LoginDto } from './dto/login.dto';
import { TokenSevice } from 'src/common/token/token.service';

@Injectable()
export class Authservice {
  constructor(
    @InjectRepository(User)
    private userTable: Repository<User>,
    private readonly tokenService: TokenSevice,
  ) {}

  async signup(payload: SignupDto) {
    const { email, password, phone, username } = payload;
    const existingUser = await this.userTable.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException({
        message: 'User with the email already exist',
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userTable.create({
        username,
        email,
        phone,
        password: hashedPassword,
      });

      const savedUser = await this.userTable.save(newUser);
      const { password: _, ...rest } = savedUser;

      return {
        message: 'User created successfully',
        user: rest,
      };
    }
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;

    const userExists = await this.userTable.findOneBy({ email });

    if (userExists && userExists.password) {
      const isTrueUser = await bcrypt.compare(password, userExists?.password);
      if (isTrueUser) {
        const { password, updatedAt, createdAt, ...userWithOutPassword } =
          userExists;

        const accessToken =
          await this.tokenService.generateAccessToken(userWithOutPassword);
        const refreshToken =
          await this.tokenService.generateRefreshToken(userWithOutPassword);

        return {
          message: 'Login successfully',
          accessToken,
          refreshToken,
          tokenType: 'Bearer',
          expire: '60',
          user: userWithOutPassword,
        };
      } else {
        throw new UnauthorizedException({
          message: 'Invalid credentials',
        });
      }
    } else {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
      });
    }
  }

  async fetchtoken(token: any) {
    try {
      console.log(token);

      const details = await this.tokenService.verifyAccessToken(token);
      console.log(details);
      const { iat, exp, ...rest } = details;
      return {
        message: 'Token verified',
        details: rest,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Something went wrong',
        error: error.message,
      });
    }
  }
}
