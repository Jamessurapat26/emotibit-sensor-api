import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Strip properties that do not have decorators
    forbidNonWhitelisted: true, // Throw error if unknown properties are sent
    transform: true,            // Automatically transform payloads to DTO instances
  }));

  const config = new DocumentBuilder()
    .setTitle('Emotibit Database API')
    .setDescription('The API for the Emotibit Database')
    .setVersion('1.2')
    .addTag('emotibit')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
