import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { IUser } from '@/users/user.interface';
import { RegisterUserDto } from '@/users/dto/create-user.dto';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    
    if (user) {
        const isValidPassword = this.usersService.isValidPassword(pass, user.password)
        if (isValidPassword)
            return user;
    }
    return null;
  }

  async login(user: IUser) {
    const { _id, name, email, role } = user;
    const payload = { 
        sub: "token login",
        iss: "from server",
        _id,
        name,
        email,
        role 
      };
    const refresh_token = this.createRefreshToken(payload)
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
      user: {
        _id,
        name,
        email,
        role 
      }
    };
  }

  async regiter(user: RegisterUserDto) {
      let newUser = await this.usersService.regiter(user);
      return { 
        _id: newUser?.id, 
        createAt: newUser?.createdAt 
      }
    }
  
  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
    });
    return refresh_token;
  }

}
