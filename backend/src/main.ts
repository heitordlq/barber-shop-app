import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      process.env.BACKOFFICE_URL || 'http://localhost:3002',
      process.env.BARBERSHOP_URL || 'http://localhost:3003',
      process.env.CLIENT_URL || 'http://localhost:3004',
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Client-Email', 'X-Client-Phone'],
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}`);
}

bootstrap();
