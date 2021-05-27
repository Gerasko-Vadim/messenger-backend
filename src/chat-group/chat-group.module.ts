import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGroupService } from './chat-group.service';
import { ChatGroup, ChatGroupSchema } from './schemas/group.schema';

@Module({
  providers: [ChatGroupService],
  imports:[MongooseModule.forFeature([{ name: ChatGroup.name, schema: ChatGroupSchema }])],
})
export class ChatGroupModule {}
