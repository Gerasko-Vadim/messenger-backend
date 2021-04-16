import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateGroupDto } from 'src/groups/dto/create-group.dto';
import { UpdateGroupDto } from 'src/groups/dto/update-group.dto';
import { RefreshTokenDto } from 'src/token/dto/refresh-token.dto';
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
  @Get('teachers')
  getAllTeachers(@Request() req) {
    return this.adminService.allTeachers(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('students')
  getAllStudents(@Request() req) {
    return this.adminService.allStudents(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('groups')
  getAllGroup(@Request() req) {
    return this.adminService.allGroups(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('groups')
  createGroup(@Request() req ,@Body() createGroupDto:CreateGroupDto) {
    return this.adminService.createGroup(req,createGroupDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('groups')
  updateGroup(@Request() req ,@Body() updateGroupDto:UpdateGroupDto) {
    return this.adminService.updateGroup(req,updateGroupDto);
  }

  @Post('refresh')
  refresh(@Body()refreshTokenDto:RefreshTokenDto){
    return this.adminService.refreshToken(refreshTokenDto)
  }

  

}
