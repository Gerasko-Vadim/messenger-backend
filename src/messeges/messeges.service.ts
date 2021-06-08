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

        const newMesseges = new this.messageModel(_.assignIn(data, { messages: [] }));
        const {_id} = await newMesseges.save()
         return await this.messageModel.updateOne({_id }, { $set: { messages: [] } }, { new: true })
    }



    // async find(id: string): Promise<IReadMesseges[]> {
    //     return await this.messegeModel.find({id}).exec();
    // }
    async sendMessage(sendData: SendMessageDto) {
        const { roomId, author, message } = sendData;
        console.log("send", sendData);

        const data: ArrayMessage = new ArrayMessage();
        data.author = mongoose.Types.ObjectId(author)
        data.createdTime = new Date()
        data.message = message

        return await this.messageModel.updateOne({ _id : roomId}, { $push: { "messages": data } })
    }

    async getAllMessagesRooms(id: string) {
        return await this.messageModel.findOne({ _id: mongoose.Types.ObjectId(id) }).lean()
        .populate({ 
            path: 'massages',
            populate: {
              path: 'author',
            }})

    }

    async getAllChatsById(id:string){
        return await this.messageModel.find({createUserId: id}).select(["_id","createUserId","group","nameRoom"])
    }

    async getAllChatsByGroup(group:string){
        return await this.messageModel.find({group: group}).select(["_id","createUserId","group","nameRoom"])
    }

}
