import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { IUser } from '@/users/user.interface';
import { RegisterUserDto } from '@/users/dto/create-user.dto';

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
    return {
      access_token: this.jwtService.sign(payload),
      _id,
      name,
      email,
      role 
    };
  }

  async regiter(user: RegisterUserDto) {
      let newUser = await this.usersService.regiter(user);
      return { 
        _id: newUser?.id, 
        createAt: newUser?.createdAt 
      }
    }

}
