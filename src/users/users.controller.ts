import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    findOneUser(@Request() req) {
      return this.userService.findByToken(req);
    }

}
