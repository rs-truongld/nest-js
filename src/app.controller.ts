import { AuthService } from './auth/auth.service';
import { Controller, Get, Post, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@/stateful/passport/stateful.local.auth.guard';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
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

  //  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  //  @UseGuards(JwtAuthGuard)
  @Get('profile1')
  getProfile1(@Request() req) {
    return req.user;
  }
}
