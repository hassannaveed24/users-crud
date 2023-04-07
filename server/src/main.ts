import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Users CRUD')
      .setDescription('This is users crud api documentation.')
      .setVersion('1.0.0')
      .build(),
  );
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
