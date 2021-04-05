import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import {  UsersService } from './users.service';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin'


@Module({
    imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    DefaultAdminModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports:[UsersService]
})
export class UsersModule {
    constructor(private readonly adminSite: DefaultAdminSite) {
        // Register the User entity under the "User" section
        adminSite.register('User', Users)
      }
}
