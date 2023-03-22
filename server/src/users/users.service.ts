import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { init } from '@paralleldrive/cuid2';

import { User, UserRoles } from './schemas/user.schema';
import { CreateUserDto, FindAllQueryDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(body: CreateUserDto | CreateUserDto[]) {
    const operations = Array.isArray(body)
      ? body.map((user) => ({
          updateOne: {
            filter: { _id: user._id },
            update: { ...user },
            upsert: true,
          },
        }))
      : [
          {
            updateOne: {
              filter: { _id: body._id },
              update: { ...body },
              upsert: true,
            },
          },
        ];
    await this.userModel.bulkWrite(operations);

    return;
  }

  async findAll(query: FindAllQueryDto) {
    const [data, totalCount] = await Promise.all([
      this.userModel.find({}, 'name email').skip(query.skip).limit(query.take).sort({ updatedAt: -1 }).lean(),
      this.userModel.countDocuments().lean(),
    ]);

    return {
      data: data.map((row, index) => ({ ...row, dbIndex: +query.skip + index })),
      totalCount,
      skip: query.skip,
      take: query.take,
    };
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

  async findByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).lean();
    return user;
  }
}
