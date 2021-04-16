import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "email"})
  email: string;

  @ApiProperty({ type: String, description: "password"})
  @IsNotEmpty()
  password: string;
}