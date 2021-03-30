import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import moment = require('moment');
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { isActive } from 'src/users/enums/isActive.enum';
import { IUsers } from 'src/users/interface/users.interface';
import {  UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import { SignOptions } from 'jsonwebtoken';
import {CreateTokenDto} from "src/token/dto/create-token.dto"

import { UsersDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
    private readonly clientAppUrl: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
    ) {
        this.clientAppUrl = this.configService.get<string>
            ('FE_APP_URL');
    }

    async signUp(userDto:UsersDto): Promise<UsersDto>{
        const checkedUser = await this.usersService.findEmail(userDto.email);
        if(checkedUser){
            throw new NotFoundException(`User the email ${userDto.email} exist`)
        }
        const user = await this.usersService.createUsers(userDto);
        await this.sendConfirmation(user);
        return userDto;
    }
    async confirm(token:string): Promise<IUsers>{
        const data = await this.verifyToken(token);
        const student = await this.usersService.find(data._id);
        await this.tokenService.delete(data._id,token);

        if(student && student.isActive === isActive.pending){
            student.isActive = isActive.active;
            return student.save();
        }
        throw new BadRequestException('Confirmation error');
    }
    async sendConfirmation(student:IUsers){
        const expiresIn= 60*60*24;
        const tokenPayload={
            _id:student._id,
            isActive:student.isActive
        }
        const expireAt=moment()
        .add(1,'day')
        .toISOString()

        const token = await this.generateToken(tokenPayload, { expiresIn });
        const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;

        await this.saveToken({token,uId:student._id,expireAt});
        await this.mailService.send({
            from:this.configService.get<string>('MY_MAIL'),
            to:student.email,
            subject:'Verify User',
            text:`
            <h3>Hello ${student.name}!</h3>
            <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `
        })
    }

    private async verifyToken(token): Promise<any> {
        try {
            const data = this.jwtService.verify(token);
            const tokenExists = await this.tokenService.exists(data._id, token);

            if (tokenExists) {
                return data;
            }
            throw new UnauthorizedException();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private async generateToken(data, options?: SignOptions): Promise<string> {
        return this.jwtService.sign(data, options);
    }
    private async saveToken(createStudentTokenDto: CreateTokenDto) {
        const userToken = await this.tokenService.create(createStudentTokenDto);

        return userToken;
    }

}
