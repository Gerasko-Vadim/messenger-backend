import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './dto/user.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { IUsers } from './interface/users.interface';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument>) { }

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
    async findEmail(email: string): Promise<IUsers> {
        return await this.userModel.findOne({ email }).exec();
    }


}
