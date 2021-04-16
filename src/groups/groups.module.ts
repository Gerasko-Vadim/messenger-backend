import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schema/group.schema';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports:[MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])],
  exports:[GroupsService]
})
export class GroupsModule {}
