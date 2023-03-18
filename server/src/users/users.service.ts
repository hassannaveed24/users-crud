import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { init } from '@paralleldrive/cuid2';

import { CreateUserDto } from './dto/user.dto';
import { User, UserRoles } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto | CreateUserDto[]) {
    const operations = Array.isArray(createUserDto)
      ? createUserDto.map((user) => ({
          updateOne: {
            filter: { _id: user._id },
            update: { ...user },
            upsert: true,
          },
        }))
      : [
          {
            updateOne: {
              filter: { _id: createUserDto._id },
              update: { ...createUserDto },
              upsert: true,
            },
          },
        ];
    await this.userModel.bulkWrite(operations);

    return;
  }

  async findAll(skip: number, take: number) {
    const [data, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(take).lean(),
      this.userModel.countDocuments().lean(),
    ]);

    return { data, total };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).lean();
    return user;
  }

  async remove(id: string) {
    await this.userModel.deleteOne({ _id: id });
    return;
  }

  getRandomUser() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
      _id: init({ length: 12 })(),
      name: faker.name.fullName({ firstName, lastName }),
      address: {
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        country: faker.address.country(),
        state: faker.address.state(),
      },
      email: faker.internet.email(firstName, lastName),
      phoneNo: faker.phone.number(),
      role: faker.helpers.arrayElement([UserRoles.ADMIN, UserRoles.MEMBER]),
    };
  }

  //seed 10000 users to database
  async seed() {
    const users: User[] = [];
    for (let index = 0; index < 10000; index++) {
      users.push(this.getRandomUser());
    }

    await this.create(users);
  }
}
