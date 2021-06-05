import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-messeges.dto';
import { ArrayMessage, MessagesDocument, Messeges } from './schema/messeges.schema';
import * as _ from 'lodash';
import { SendMessageDto } from './dto/sendMesseg.dto'
import { IReadMesseges } from './interafce/readable-messege.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class MessegesService {
    constructor(@InjectModel(Messeges.name) private messageModel: Model<MessagesDocument>) {
    }
    async create(data: CreateMessageDto) {
        const { roomId } = data;
        const newMesseges = new this.messageModel(_.assignIn({
            roomId: mongoose.Types.ObjectId(roomId),
            ...data
        }, { messages: [] }))
        return await newMesseges.save()
        // return await this.messageModel.updateOne({ roomId: roomId }, { $set: { messages: [] } }, { new: true })
    }

    async addProperty(id: any) {

    }

    // async find(id: string): Promise<IReadMesseges[]> {
    //     return await this.messegeModel.find({id}).exec();
    // }
    async sendMessage(sendData: SendMessageDto) {
        const { roomId, author, message } = sendData;
        console.log("send", sendData);
        const data = {
            author: mongoose.Types.ObjectId(author),
            message: message,
            createdTime: new Date()
        }


        return await this.messageModel.updateOne({ roomId: mongoose.Types.ObjectId(roomId) }, { $push: { "messages": data } })
    }

    async getAllMessagesRooms(id: string) {
        return await this.messageModel.findOne({ roomId: id })

    }

}
