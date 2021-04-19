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


dotenv.config();
const uri = process.env.MONGODB || 'mongodb+srv://vadim:12345adidas99@cluster0.2exxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
@Module({
  imports: [
  UsersModule,
  configModule,
  AuthModule,
  TokenModule,
  MongooseModule.forRoot(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ),
  AdminModule,
  GroupsModule,
 ],
 controllers:[AppController]
})
export class AppModule {}
