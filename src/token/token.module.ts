import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenSchema } from './schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: 'secret',
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService],
    })
  ],
  providers: [TokenService,JwtStrategy],
  exports: [TokenService],
})
export class TokenModule {}
