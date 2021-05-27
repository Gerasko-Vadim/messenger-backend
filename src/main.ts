import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { RedisIoAdapter } from './adapters/redis-io.adapter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe());

   const config = new DocumentBuilder()
    .setTitle('Messenger example')
    .setDescription('The messenger API description')
    .setVersion('1.0')
    .addTag('messenger')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
