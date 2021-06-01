import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessegeDto } from './dto/create-messeges.dto';
import { Messeges, MessegesDocument } from './schema/messeges.schema';
import * as _ from 'lodash';
import { SendMessegDto } from './schema/sendMesseg.dto';
import { IReadMesseges } from './interafce/readable-messege.interface';

@Injectable()
export class MessegesService {
    constructor(@InjectModel(Messeges.name) private messegeModel: Model<MessegesDocument>) {
    }
    async create(data: CreateMessegeDto) {
        const newMesseges = new this.messegeModel(_.assignIn(data, { messeges: [] }))
        return await newMesseges.save()
    }

    // async find(id: string): Promise<IReadMesseges[]> {
    //     return await this.messegeModel.find({id}).exec();
    // }
    async sendMessege(sendData:SendMessegDto){
        const { roomId , ...rest} = sendData;
        const chat = await this.messegeModel.find({roomId});
        const date = new Date();
        chat.messages.push({
            createdTime: date,
            rest
        })
        return chat.save()

    }

}
