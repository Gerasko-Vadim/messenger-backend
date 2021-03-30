import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
require("dotenv").config();

import {  UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { configModule } from './configure.root';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';



@Module({
  imports: [
  UsersModule,
  configModule,
  AuthModule,
  TokenModule,
  MailModule,
  MongooseModule.forRoot(
    process.env.MONGODB_WRITE_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ),

 ],
})
export class AppModule {}
