import { TransformInterceptor } from './core/transform.interceptor';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import ms from 'ms';
import passport from "passport";
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const reflector = app.get( Reflector );
  // app.useGlobalGuards( new JwtAuthGuard( reflector ));

  //config view engine
  app.useStaticAssets(join(__dirname, '..', 'src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('ejs');
  
  //config cookies
  app.use(cookieParser());
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //config session
  app.use(session({
    secret: configService.get<string>('EXPRESS_SESSION_SECRET'),
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: ms(configService.get<string>('EXPRESS_SESSION_COOKIE')) },
    store: MongoStore.create({
      mongoUrl: configService.get<string>('MONGODB_URI'),
    })
  }));

  app.enableCors();

  //config passport
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(port);
}
bootstrap();
