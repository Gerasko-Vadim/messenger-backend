import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
require("dotenv").config();

import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { configModule } from './configure.root';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';



@Module({
  imports: [
  StudentsModule,
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
