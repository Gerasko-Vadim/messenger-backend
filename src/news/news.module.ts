import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { NewsService } from './news.service';
import {  New, NewSchema } from './schema/new.chema';

@Module({
    imports:[MongooseModule.forFeature([{ name: New.name, schema: NewSchema }]),
    UsersModule

],
    providers:[NewsService],
    exports:[NewsService]
})
export class NewsModule {}
