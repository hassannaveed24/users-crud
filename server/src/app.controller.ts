import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags('Auth')
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  @ApiBody({ type: LoginDto })
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiTags('Auth')
  @Post('decode')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  decode(@Request() req) {
    return this.authService.decode(req.user);
  }
}
