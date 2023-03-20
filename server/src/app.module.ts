import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/users-crud'), UsersModule, AuthModule, PassportModule],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
