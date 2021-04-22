import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { IAdmin } from './interface/admin.interface';
import { Admin, AdminDocument } from './schema/admin.schema';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { IRedableAdmin } from './interface/readable-admin.interface';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as moment from 'moment';
import { CreateTokenDto } from 'src/token/dto/create-token.dto';
import { adminSensitiveFieldsEnum } from './enums/admin-sensitive.enum';
import { TokenService } from 'src/token/token.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { RefreshTokenDto } from 'src/token/dto/refresh-token.dto';
import { ITokenPayload } from 'src/auth/interface/token-payload.interface';
import { IUsers } from 'src/users/interface/users.interface';
import { UsersService } from 'src/users/users.service';
import { IReadableUser } from 'src/users/interface/readable-user.interface';
import { role } from 'src/users/enums/role.enum';
import { userSensitiveFieldsEnum } from 'src/users/enums/protected-fields.enum';
import { plainToClass } from 'class-transformer';
import { ReadableUserDto } from './dto/readable-user.dto';
import { IGroup } from 'src/groups/interface/group.interface';
import { GroupsService } from 'src/groups/groups.service';
import { CreateGroupDto } from 'src/groups/dto/create-group.dto';
import { UpdateGroupDto } from 'src/groups/dto/update-group.dto';
import { ChangeUser } from 'src/users/dto/change-user-status.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly groupService: GroupsService
  ) { }
  private readonly defaultAdmin = {
    email: "admin",
    password: "admin"
  }

  async createDefaultAdmin(): Promise<IAdmin> {
    const isAdmin = await this.adminModel.find();
    if (!isAdmin) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(this.defaultAdmin.password, salt);
 
      const createdAdmin = new this.adminModel(_.assignIn(this.defaultAdmin, { password: hash }));
      return await createdAdmin.save();
    }

  }
  async onApplicationBootstrap() {
    this.createDefaultAdmin();
  }



  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { id, old_token } = refreshTokenDto;
    const existUser = await this.tokenService.exists(id, old_token);
    if (existUser) {
      const data = await this.adminModel.findById(id);
      this.tokenService.delete(id, old_token);
      const tokenPayload = {
        _id: data._id
      };
      const token = await this.generateToken(tokenPayload)
      const expireAt = moment()
        .add(1, 'day')
        .toISOString();

      await this.saveToken({
        token,
        expireAt,
        uId: data._id,
      });
      return {
        accessToken: token
      }
    }
    else {
      throw new BadRequestException()
    }


  }

  async signInService({ email, password }: CreateAdminDto): Promise<IRedableAdmin> {
    const admin = await this.findEmail(email);
  
    if (admin && (await bcrypt.compare(password, admin.password))) {

      const tokenPayload = {
        _id: admin._id,
        role:admin.role
      };

      const token = await this.generateToken(tokenPayload);
      const expireAt = moment()
        .add(1, 'day')
        .toISOString();

      await this.saveToken({
        token,
        expireAt,
        uId: admin._id,
      });

      const readableUser = admin.toObject() as IRedableAdmin;
      readableUser.accessToken = token;
      return _.omit<any>(readableUser, Object.values(adminSensitiveFieldsEnum)) as IRedableAdmin;
    }

    throw new BadRequestException('Invalid credentials');
  }

  private async generateToken(data, options?: JwtSignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private async saveToken(createAdminTokenDto: CreateTokenDto) {
    const userToken = await this.tokenService.create(createAdminTokenDto);

    return userToken;
  }

  async findEmail(email: string): Promise<IAdmin> {
    return await this.adminModel.findOne({ email }).exec();
  }

  async allTeachers(req: any): Promise<ReadableUserDto[]> {
    const tokenExists =  this.checkedToken(req);
    if (tokenExists) {
      const teachers = await this.userService.getAllTeachers();
      return plainToClass(ReadableUserDto, teachers, { strategy: "excludeAll" })
    }
  }

  async allStudents(req: any): Promise<ReadableUserDto[]>{
    const tokenExists =  this.checkedToken(req);
    if (tokenExists) {
      const students = await this.userService.getAllStudents();
      return plainToClass(ReadableUserDto, students, { strategy: "excludeAll" })
    }
  }

  async checkedToken(req:any){
    const token = req.headers.authorization.slice(7);
    return await this.authService.verifyToken(token)
  }

  async allGroups(req: any): Promise<IGroup[]>{
    const tokenExists = this.checkedToken(req);
    if (tokenExists) {
      return await this.groupService.findAll();
    }
  }

  async createGroup(req:any,createGroupDto:CreateGroupDto): Promise<IGroup>{
    const tokenExists = this.checkedToken(req);
    if (tokenExists) {
      return await this.groupService.create(createGroupDto);
    }
  }

  async updateGroup(req:any, updateGroupDto:UpdateGroupDto): Promise<IGroup>{
    const tokenExists = this.checkedToken(req);
    if (tokenExists) {
      return await this.groupService.update(updateGroupDto);
    }
  }

  async changeIsActive (req:any, changeUser:ChangeUser) : Promise<ReadableUserDto>{
    const tokenExists = this.checkedToken(req);
    if (tokenExists) {
      const user = await this.userService.changeUser(changeUser)
      return plainToClass(ReadableUserDto, user, { strategy: "excludeAll" })
    }
  }


}
