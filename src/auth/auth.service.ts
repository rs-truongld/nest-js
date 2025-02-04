import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
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

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
