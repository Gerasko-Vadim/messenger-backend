import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly authService:AuthService,
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
  onApplicationBootstrap() {
    this.createDefaultAdmin();
  }

  async signIn({ email, password }: CreateAdminDto): Promise<IRedableAdmin> {
    const admin = await this.findEmail(email);

    if (admin && (await bcrypt.compare(password, admin.password))) {

      const tokenPayload = {
        _id: admin._id
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

  async getProfile(req : any){
    const token = req.headers.authorization.slice(7);
    const profile = await this.authService.verifyToken(token);
    return await this.adminModel.findById(profile._id);

  }
}
