import { Body, Controller, Get, Param, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUserDto } from './dto/get-users.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('/:id')
    findOneUser(@Request() req, @Param('id') id: string) {
      return this.userService.findByToken(req,id);
    }
    @Post('/update')
    @FormDataRequest()
    updateUsers(@Request() req, @Body() updateUser:UpdateUser) {
        return this.userService.updateUsers(req,updateUser)
        
    }
    @Post('/change-password')
    changePassword(@Request() req, @Body()changePasswordDto:ChangePasswordDto){
      return this.userService.changePassword(req,changePasswordDto)
    }

}
