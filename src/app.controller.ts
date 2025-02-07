import { AuthService } from './auth/auth.service';
import { Controller, Get, Post, Render, Req, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@/stateful/passport/stateful.local.auth.guard';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
  ) { }

}
