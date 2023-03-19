import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger/dist';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'single/multiple user create/update' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  @ApiOkResponse({ description: 'get paginated users by supplying skip and take' })
  findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return this.usersService.findAll(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
