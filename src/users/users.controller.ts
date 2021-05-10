import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { GetUserDto } from './dto/get-users.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('users/:id')
    findOneUser(@Request() req, @Param('id') id: string) {
      return this.userService.findByToken(req,id);
    }

}
