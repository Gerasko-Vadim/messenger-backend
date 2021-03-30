import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {  UsersDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import { role } from 'src/users/enums/role.enum';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signUp/students')
    async signUpStudent(@Body(ValidationPipe) usersDto: UsersDto): Promise<UsersDto> {
        const user = _.assignIn(usersDto, { role: role.student })
        return this.authService.signUp(user);
    }

    @Post('/signUp/teachers')
    async signUpTeacher(@Body(ValidationPipe) usersDto: UsersDto): Promise<UsersDto> {
        const user = _.assignIn(usersDto, { role: role.teacher })
        return this.authService.signUp(user);
    }

}
