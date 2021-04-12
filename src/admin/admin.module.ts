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

@Module({
  controllers: [AdminController,],
  providers: [AdminService],
  imports:[MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  TokenModule,
  AuthModule,
  configModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
  }),
]
})
export class AdminModule { }
