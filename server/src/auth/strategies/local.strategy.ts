import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    //Assuming we are not receiving password in request
    super({ usernameField: 'email', passwordField: 'email' });
  }

  async validate(email: string): Promise<any> {
    const user = await this.authService.validateUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
