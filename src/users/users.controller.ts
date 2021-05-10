import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { GetUserDto } from './dto/get-users.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    findOneUser(@Request() req, @Body() getUserDto:GetUserDto) {
      return this.userService.findByToken(req,getUserDto);
    }

}
