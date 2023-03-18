import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto, UserRoles } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    await this.userModel.create(createUserDto);

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  //seed 10000 users to database
  async seed() {
    await this.create({
      name: 'seeded name',
      address: {
        addressLine1: 'seeded addressLine1',
        addressLine2: 'seeded ',
        city: 'seeded city',
        country: 'seeded country',
        state: 'seeded state',
      },
      email: 'seeded email',
      phoneNo: 'seeded phoneNo',
      role: UserRoles.MEMBER,
    });
  }
}
