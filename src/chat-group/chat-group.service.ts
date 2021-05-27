import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from 'src/groups/dto/create-group.dto';
import { IChatGroup } from './interface/chat-group.interface';
import { ChatGroup, ChatGroupDocument } from './schemas/group.schema';

@Injectable()
export class ChatGroupService {
    constructor(@InjectModel(ChatGroup.name) private chatGroupModel: Model<ChatGroupDocument>){}


    async create(createChatGroupDto:CreateGroupDto){
        const newGroup = new this.chatGroupModel(createChatGroupDto);
        return await newGroup.save()
    }

    async findByGroup(group:string): Promise<IChatGroup[]>{
        return await this.chatGroupModel.find({group});
    }

}
