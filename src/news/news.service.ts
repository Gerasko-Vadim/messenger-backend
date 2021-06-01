import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateNewDto } from './dto/create-new.dto';
import { New, NewDocument } from './schema/new.chema';
import * as _ from 'lodash';
import { INew } from './interface/new.interface';
import { DeleteNewDto } from "./dto/delete-new.dto"
import moment from 'moment';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(New.name) private newModel: Model<NewDocument>,
        private readonly userService: UsersService
    ) { }

    async create(createNewDto: CreateNewDto) {
        const user = await this.userService.find(createNewDto.uId);
        if (user) {
            const createNew = new this.newModel(_.assignIn(createNewDto, {
                avatar: user.avatar,
                name: user.name,
                surname: user.surname,
                patronymic: user.patronymic
            }));
            return await createNew.save();
        }
    }

    async findByIdDelete(data: DeleteNewDto) {
        const { uId, _id } = data;
        return await this.newModel.deleteOne({ uId, _id })
    }

    async findAllNews(): Promise<INew[]> {
        return await this.newModel.find().exec()
    }
}
