import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'hassannaveed24@gmail.com' })
  email: string;
}

export class LoginResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNHc4ZzB0MDB6aTYiLCJpYXQiOjE2NzkyODA2MjAsImV4cCI6MTY3OTI4MDY4MH0.OMFrvVy_Q2aEwp_x5mRrJuzZ8S7hriVTWOrDUeaNulM',
  })
  access_token: string;
}
