import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenSchema } from './schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
  ],
  providers: [TokenService,JwtStrategy],
  exports: [TokenService],
})
export class TokenModule {}
