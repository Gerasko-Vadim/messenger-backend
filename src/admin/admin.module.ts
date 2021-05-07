import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from './schema/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from 'src/token/token.module';
import { configModule } from 'src/configure.root';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { GroupsModule } from 'src/groups/groups.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AdminController,],
  providers: [AdminService],
  imports:[MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  TokenModule,
  UsersModule,
  GroupsModule,
  configModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: 'secret',
      signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
    }),
    inject: [ConfigService],
  })
]
})
export class AdminModule { }
