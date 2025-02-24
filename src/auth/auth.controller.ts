import { UsersService } from '@/users/users.service';
import { Body, Controller, Get, Post, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@/stateful/passport/stateful.local.auth.guard';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from '@/decorator/customize';
import { RegisterUserDto } from '@/users/dto/create-user.dto';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  //tham khảo: https://www.loginradius.com/blog/engineering/guest-post/session-authentication-with-nestjs-and-mongodb/
  //https://www.loginradius.com/blog/engineering/guest-post/session-authentication-with-nestjs-and-mongodb/

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async handleLogin(@Request() req) {
    return this.authService.login(req.user)
  }

  // @UseGuards(LocalAuthGuard)
  @Public()
  @ResponseMessage("Register a New User")
  @Post('registerUser')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.regiter(registerUserDto);
  }
}
