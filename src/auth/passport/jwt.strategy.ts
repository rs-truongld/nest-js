import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUser } from '@/users/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private ConfigService: ConfigService

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
    });
  }

  async validate(payload: IUser) {
    const { _id, name, email, role } = payload;

    return { 
      _id,
      name,
      email,
      role 
    };
  }
}
