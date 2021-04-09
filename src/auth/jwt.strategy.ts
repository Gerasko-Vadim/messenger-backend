import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "src/token/token.service";
import { IUsers } from "src/users/interface/users.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService, 
    private readonly tokenService: TokenService,
    ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        passReqToCallback: true,
    }
    );
    
  }

  async validate(req, user: Partial<IUsers>) {
    const token = req.headers.authorization.slice(7);
    const tokenExists = await this.tokenService.exists(user._id, token);
    if (tokenExists) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}