import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-messeges.dto';
import { Messeges, MessegesDocument } from './schema/messeges.schema';
import * as _ from 'lodash';
import { SendMessegDto } from './schema/sendMesseg.dto';
import { IReadMesseges } from './interafce/readable-messege.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class MessegesService {
    constructor(@InjectModel(Messeges.name) private messageModel: Model<MessegesDocument>) {
    }
    async create(data: CreateMessageDto) {
        const { roomId } = data;
        const newMesseges = new this.messageModel(_.assignIn(data, { messages: [] }))
        await newMesseges.save()
        return await this.messageModel.updateOne({ roomId: roomId }, { $set: { messages: [] } }, { new: true })
    }

    async addProperty(id: any) {

    }

    // async find(id: string): Promise<IReadMesseges[]> {
    //     return await this.messegeModel.find({id}).exec();
    // }
    async sendMessage(sendData: SendMessegDto) {
        const { roomId, author, message } = sendData;
        console.log("send", sendData)
        const data = {
            createdTime: new Date(),
            author: mongoose.Types.ObjectId(author),
            message
        }

        return await this.messageModel.updateOne({ roomId: roomId }, { $push: { 'messages': data } })
    }

    async getAllMessagesRooms(id: string) {
        return await this.messageModel.findOne({ roomId: id })
            .populate({ path: 'messages' })
            .populate({
                path: 'author',
                model: 'Users'

            })

    }

}
