import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import {  UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { configModule } from './configure.root';
import { TokenModule } from './token/token.module';
import { AdminModule } from './admin/admin.module';
import { GroupsModule } from './groups/groups.module';


import * as dotenv from "dotenv"
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module'
import { join } from 'path';
import { path } from "app-root-path"
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { ChatGroupModule } from './chat-group/chat-group.module';
import { NewsService } from './news/news.service';
import { NewsModule } from './news/news.module';
import { MessegesService } from './messeges/messeges.service';
import { MessegesModule } from './messeges/messeges.module';



dotenv.config({path:'.env.development'})
 const uri = process.env.MONGODB || 'mongodb+srv://vadim:12345adidas99@cluster0.2exxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
@Module({
  imports: [
  UsersModule,
  configModule,
  AuthModule,
  TokenModule,
  ServeStaticModule.forRoot({ 
    rootPath: `${path}/photos`,
    serveRoot:'/photos'
}), 
  MongooseModule.forRoot(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ),
  AdminModule,
  GroupsModule,
  ChatModule,
  ChatGroupModule,
  NewsModule,
  MessegesModule,
 ],
 controllers:[AppController],
 providers: [MessegesService],
})
export class AppModule {}
