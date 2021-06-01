import { Module } from '@nestjs/common';
import { ChatGroupModule } from 'src/chat-group/chat-group.module';
import { NewsModule } from 'src/news/news.module';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';
import { NewGateway } from './new.gateway';


@Module({
  providers: [ChatGateway,NewGateway],
  imports:[UsersModule, NewsModule,ChatGroupModule]
})
export class ChatModule {}