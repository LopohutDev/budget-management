import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

export let app: INestApplication;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = JSON.parse(process.env.CORS_WHITELIST || '[]');

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  const port = process.env.PORT || 4000;

  await app.listen(port);
}
bootstrap();
