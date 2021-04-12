import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}



  @Post('signIn')
  signIn(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.signIn(createAdminDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return this.adminService.getProfile(req);
  }
  

}
