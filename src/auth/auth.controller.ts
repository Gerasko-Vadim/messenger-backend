import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import {  UsersDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import { role } from 'src/users/enums/role.enum';
import { SignInDto } from './dto/signIn.dto';
import { IReadableUser } from 'src/users/interface/readable-user.interface';
import { RefreshTokenDto } from 'src/token/dto/refresh-token.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Users } from 'src/users/schemas/users.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiResponse({
        type:UsersDto
    })
    @Post('/signUp/students')
    async signUpStudent(@Body(ValidationPipe) usersDto: UsersDto): Promise<UsersDto> {
        const user = _.assignIn(usersDto, { role: role.student })
        return this.authService.signUp(user);
    }

    @ApiBody({type:SignInDto})
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Users,
      })
    @Post('signIn')
    async signInUser(@Body(new ValidationPipe()) signinDto:SignInDto): Promise<IReadableUser>{
        return this.authService.signIn(signinDto);
    }

    @ApiResponse({
        type:UsersDto
    })
    @Post('/signUp/teachers')
    async signUpTeacher(@Body(ValidationPipe) usersDto: UsersDto): Promise<UsersDto> {
        const user = _.assignIn(usersDto, { role: role.teacher })
        return this.authService.signUp(user);
    }

    @ApiBody({type:RefreshTokenDto})
    @ApiResponse({description:"accessToken users"})
    @Post('refresh')
    async refreshToken(@Body(ValidationPipe) refreshTokenDto: RefreshTokenDto): Promise<any> {
        return this.authService.refreshToken(refreshTokenDto);
    }


}
