import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  @ApiBody({ type: LoginDto })
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('protected')
  @UseGuards(AuthenticatedGuard)
  getProtected(): string {
    return 'Protected';
  }
}
