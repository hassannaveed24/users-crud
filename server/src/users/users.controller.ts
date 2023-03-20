import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger/dist';

import { UsersService } from './users.service';
import { CreateUserDto, FindAllQueryDto } from './dto/user.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiSecurity('bearer')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Single/multiple user created/updated' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  @ApiOkResponse({ description: 'Get paginated users by supplying skip and take' })
  findAll(@Query() query: FindAllQueryDto) {
    return this.usersService.findAll(query);
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
