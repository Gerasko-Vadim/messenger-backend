import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from 'src/token/token.module';
import { Users, UsersSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import {  UsersService } from './users.service';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
        TokenModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports:[UsersService]
})
export class UsersModule {
    constructor() {}
}
