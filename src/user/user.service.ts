import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user.entity';
import { TokenSevice } from 'src/common/token/token.service';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userTable: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async getUserById(id: number) {
    const userExists = await this.userTable.findOneBy({ id });

    if (userExists) {
      const { password, createdAt, updatedAt, ...userWithOutPassword } =
        userExists;
      return {
        message: 'User fetched successsfully',
        user: userWithOutPassword,
      };
    } else {
      throw new NotFoundException({
        message: 'User not found ',
      });
    }

    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
