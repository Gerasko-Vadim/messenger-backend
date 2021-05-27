import { Module } from '@nestjs/common';
import { NewsModule } from 'src/news/news.module';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';
import { NewGateway } from './new.gateway';


@Module({
  providers: [ChatGateway,NewGateway],
  imports:[UsersModule, NewsModule]
})
export class ChatModule {}