import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './dto/user.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { IUsers } from './interface/users.interface';
import * as _ from 'lodash';
import { role } from './enums/role.enum';
import { ChangeUser } from './dto/change-user-status.dto';
import { TokenService } from 'src/token/token.service';
import { GetUserDto } from './dto/get-users.dto';
import { UpdateUser } from './dto/update-user.dto';
import * as fs from "fs-extra"
import { IReadableUser } from './interface/readable-user.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<UsersDocument>,
        private readonly tokenService: TokenService
    ) { }

    async getAll(): Promise<Users[]> {
        return this.userModel.find().exec()
    }
    async createUsers(userDto: UsersDto): Promise<IUsers> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(userDto.password, salt);

        const createdUser = new this.userModel(_.assignIn(userDto, { password: hash }));
        return await createdUser.save();
    }
    async find(id: string): Promise<IUsers> {
        return await this.userModel.findById(id).exec();
    }

    async findByGroup(group: string): Promise<IUsers[]> {
        return await this.userModel.find({ group })
    }

    async checkedToken(req: any) {
        const token = req.headers.authorization.slice(7);
        return await this.tokenService.verifyToken(token)
    }

    async findByToken(req: any, id: string): Promise<IUsers | null> {
        const userId = id.replace(/"/g, "")
        const tokenExists = this.checkedToken(req)
        if (tokenExists) {
            return await this.find(userId)
        }



    }

    async getAllTeachers(): Promise<IUsers[]> {
        return await this.userModel.find({ role: role.teacher })
    }

    async getAllStudents(): Promise<IUsers[]> {
        return await this.userModel.find({ role: role.student })
    }
    async findEmail(email: string): Promise<IUsers> {
        return await this.userModel.findOne({ email }).exec();
    }

    async changeUser(changeUser: ChangeUser): Promise<IUsers> {
        const user = await this.find(changeUser.id);
        user.isActive = changeUser.isActive;
        return user.save()

    }

    async updateUsers(req: any, updateUser: UpdateUser) {
        const { id, avatar, ...data } = updateUser;
        const user = await this.find(id);
        const tokenExists = this.checkedToken(req)
        console.log(tokenExists)
        const fileName = user.avatar.slice(42);
        if (tokenExists) {
            if (avatar) {
                if (avatar.filename !== fileName) {
                    fs.removeSync(`./photos/${fileName}`)
                }
                return await this.userModel.findByIdAndUpdate(id, {
                    ...data,
                    avatar: `${process.env.FE_APP_URL}/photos/${avatar.filename}`

                }, { upsert: true })
            }
            return await this.userModel.findByIdAndUpdate(id, data, { upsert: true })

        }
    }



}
//42