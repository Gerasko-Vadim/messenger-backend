import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVerifyToken } from 'src/auth/interface/verifyToken.interface';
import { CreateTokenDto } from './dto/create-token.dto';
import {  IUserToken } from './interface/token-interface';

@Injectable()
export class TokenService {

  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<IUserToken>,
    private readonly jwtService:JwtService
    ) { }
    
  async create(createTokenDto: CreateTokenDto): Promise<IUserToken> {
    const userToken = new this.tokenModel(createTokenDto);
    return await userToken.save();
  }

  async delete(uId: string, token: string): Promise<{ ok?: number, n?: number }> {
    return await this.tokenModel.deleteOne({ uId, token })
  }

  async deleteAll(uId: string): Promise<{ ok?: number, n?: number }> {
    return await this.tokenModel.deleteMany({ uId });
  }

  async exists(uId: string, token: string): Promise<boolean> {
    return await this.tokenModel.exists({ uId, token });
  }

  async verifyToken(token:string): Promise<IVerifyToken> {
    try {
        const data = this.jwtService.verify(token);
        const tokenExists = await this.exists(data._id, token);

        if (tokenExists) {
            return data;
        }
        else{
            throw new UnauthorizedException();
        }
        
    } catch (error) {
        throw new UnauthorizedException();
    }
}
}
