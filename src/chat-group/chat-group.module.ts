import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGroupService } from './chat-group.service';
import { ChatGroup, ChatGroupSchema } from './schemas/group.schema';
import { ChatGroupController } from './chat-group.controller';

@Module({
  providers: [ChatGroupService],
  imports:[MongooseModule.forFeature([{ name: ChatGroup.name, schema: ChatGroupSchema }])],
  controllers: [ChatGroupController],
  exports:[ChatGroupService]
})
export class ChatGroupModule {}
