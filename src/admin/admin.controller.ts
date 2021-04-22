import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateGroupDto } from 'src/groups/dto/create-group.dto';
import { UpdateGroupDto } from 'src/groups/dto/update-group.dto';
import { RefreshTokenDto } from 'src/token/dto/refresh-token.dto';
import { ChangeUser } from 'src/users/dto/change-user-status.dto';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }



  @Post('signIn')
  signIn(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.signInService(createAdminDto);
  }

 
  @Get('teachers')
  getAllTeachers(@Request() req) {
    return this.adminService.allTeachers(req);
  }

 
  @Post('change-users')
  changeIsActive(@Request() req, @Body() changeUser: ChangeUser) {
    return this.adminService.changeIsActive(req, changeUser);
  }


  @Get('students')
   getAllStudents(@Request() req) {
    return this.adminService.allStudents(req);
  }

 
  @Get('groups')
  getAllGroup(@Request() req) {
    return this.adminService.allGroups(req);
  }


  @Post('groups')
  createGroup(@Request() req, @Body() createGroupDto: CreateGroupDto) {
    return this.adminService.createGroup(req, createGroupDto);
  }


  @Patch('groups')
  updateGroup(@Request() req, @Body() updateGroupDto: UpdateGroupDto) {
    return this.adminService.updateGroup(req, updateGroupDto);
  }

  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.adminService.refreshToken(refreshTokenDto)
  }



}
