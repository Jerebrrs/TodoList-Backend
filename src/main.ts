import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './confing/envarioments';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: true,
  };

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors(corsOptions);
  await app.listen(envs.port);
  console.log('Server is running on PORT: ', envs.port);
}
bootstrap();
