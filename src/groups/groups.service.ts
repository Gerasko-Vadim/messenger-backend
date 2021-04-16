import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { IGroup } from './interface/group.interface';
import { Group, GroupDocument } from './schema/group.schema';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>){}

  async create(createGroupDto: CreateGroupDto): Promise<IGroup> {
    const isGroup = await this.findOne(createGroupDto.group);
    if(!isGroup){
      const newGroup = new this.groupModel(createGroupDto);
      return await newGroup.save()
    }
    else{
      throw new BadRequestException("The group exists")
    }

  }

  async findAll(): Promise<IGroup[]> {
    return await this.groupModel.find();
  }

  async findOne(group: string) {
    return await this.groupModel.findOne({group}).exec();
  }

  async update(updateGroupDto: UpdateGroupDto) {
    return await this.groupModel.findByIdAndUpdate(updateGroupDto.id,{$set:{status:updateGroupDto.status}})
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
