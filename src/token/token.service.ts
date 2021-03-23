import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTokenDto } from './dto/create-token.dto';
import { IStudentToken } from './interface/token-interface';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private readonly tokenModel: Model<IStudentToken>) { }
  async create(createTokenDto: CreateTokenDto): Promise<IStudentToken> {
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
}
