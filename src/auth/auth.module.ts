import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { UsersModule } from '@/users/users.module';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, PassportModule, JwtStrategy,  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
  imports: [UsersModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRED_IN'),
        },

      }),
      inject: [ConfigService],
    }),
  ], 
  exports: [AuthService], 
  controllers: [AuthController]
})
export class AuthModule {}
