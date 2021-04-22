import { BadRequestException, Injectable, MethodNotAllowedException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { JwtService } from '@nestjs/jwt';
import { isActive } from 'src/users/enums/isActive.enum';
import { IUsers } from 'src/users/interface/users.interface';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import { SignOptions } from 'jsonwebtoken';
import { CreateTokenDto } from "src/token/dto/create-token.dto"

import { UsersDto } from 'src/users/dto/user.dto';
// import { sendEmail } from 'src/confirm/confirmMail';
import { SignInDto } from './dto/signIn.dto';
import { ITokenPayload } from './interface/token-payload.interface';
import { IReadableUser } from 'src/users/interface/readable-user.interface';
import { userSensitiveFieldsEnum } from 'src/users/enums/protected-fields.enum';
import { RefreshTokenDto } from 'src/token/dto/refresh-token.dto';

@Injectable()
export class AuthService {
    private readonly clientAppUrl: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly configService: ConfigService,
    ) {
        this.clientAppUrl = this.configService.get<string>
            ('FE_APP_URL');
    }

    async signUp(userDto: UsersDto): Promise<UsersDto> {
        const checkedUser = await this.usersService.findEmail(userDto.email);
        if (checkedUser) {
            throw new NotFoundException(`User the email ${userDto.email} exist`)
        }
        const user = await this.usersService.createUsers(userDto);
        await this.sendConfirmation(user);
        return userDto;
    }

    async signIn({email,password}:SignInDto): Promise<IReadableUser>{
        const user = await (await this.usersService.findEmail(email));

        if(user && (await bcrypt.compare(password, user.password))){
            if(user.isActive!== isActive.active){
                throw new MethodNotAllowedException();
            }
            const tokenPayload = this.genericTokenPayload(user);
    
            const token = await this.generateToken(tokenPayload);
            const expireAt = moment()
            .add(1,'day')
            .toISOString();
    
            await this.saveToken({
                token,
                expireAt,
                uId:user._id,
            });
    
            const readableUser = user.toObject() as IReadableUser;
            readableUser.accessToken=token;
            return _.omit<any>(readableUser,Object.values(userSensitiveFieldsEnum)) as IReadableUser;
        }

        throw new BadRequestException('Invalid credentials');

    }

    genericTokenPayload(user:IUsers):ITokenPayload{
        return{
            _id:user._id,
            isActive: user.isActive,
            roles:user.role
        }
    }

    async confirm(token: string): Promise<IUsers> {
        const data = await this.verifyToken(token);
        const student = await this.usersService.find(data._id);
        await this.tokenService.delete(data._id, token);

        if (student && student.isActive === isActive.pending) {
            student.isActive = isActive.active;
            return student.save();
        }
        throw new BadRequestException('Confirmation error');
    }
    async sendConfirmation(user: IUsers) {
        const expiresIn = 60 * 60 * 24;
        const tokenPayload = {
            _id: user._id,
            isActive: user.isActive,
            roles:user.role
        }
        const expireAt = moment()
            .add(1, 'day')
            .toISOString()

        const token = await this.generateToken(tokenPayload, { expiresIn });
        const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;

        await this.saveToken({ token, uId: user._id, expireAt });
        //await sendEmail(student.email,confirmLink);
        // await this.mailService.send({
        //     from:this.configService.get<string>('MY_MAIL'),
        //     to:student.email,
        //     subject:'Verify User',
        //     text:`
        //     <h3>Hello ${student.name}!</h3>
        //     <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
        //     `
        // })
    }

     async verifyToken(token:string): Promise<any> {
        try {
            console.log("vhjdfvd")
            const data = this.jwtService.verify(token);
            const tokenExists = await this.tokenService.exists(data._id, token);
            console.log(tokenExists)

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

    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        const {id , old_token} = refreshTokenDto;
        const existUser = await this.tokenService.exists(id,old_token);
        if (existUser){
            const data = await this.usersService.find(id);
            this.tokenService.delete(id,old_token);
            const tokenPayload= this.genericTokenPayload(data)
            const token = await this.generateToken(tokenPayload)
            const expireAt = moment()
            .add(1,'day')
            .toISOString();
    
            await this.saveToken({
                token,
                expireAt,
                uId:data._id,
            });
            return {
                accessToken:token
            }
        }
        else{
             throw new BadRequestException()
        }


    }

    private async generateToken(data: ITokenPayload, options?: SignOptions): Promise<string> {
        return this.jwtService.sign(data, options);
    }
    private async saveToken(createStudentTokenDto: CreateTokenDto) {
        const userToken = await this.tokenService.create(createStudentTokenDto);

        return userToken;
    }

}
