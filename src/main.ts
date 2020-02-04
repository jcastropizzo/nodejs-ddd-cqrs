import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifyCors from 'fastify-cors';
import { AppModule } from './app.module';
import { config } from '../config';
import { AppDAO } from './account/dao';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter({
    trustProxy: true,
  }));
  const documentOptions = new DocumentBuilder()
    .setTitle(config.TITLE)
    .setDescription(config.DESCRIPTION)
    .setVersion(config.VERSION)
    .setBasePath(`/${config.PREFIX}`)
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  const validationOptions = {
    skipMissingProperties: true,
    validationError: { target: false },
  };
  /*--------------------------------------------*/
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.setGlobalPrefix(config.PREFIX);
  app.register(fastifyCors, {
    origin: true,
  });
  SwaggerModule.setup(config.API_EXPLORER_PATH, app, document);
  /* TODO: move to .env*/
  AppDAO.initDb("./data");
  await app.listen(config.PORT, config.HOST);
  Logger.log(`Server listening on port ${config.PORT}`, 'Bootstrap');
}

bootstrap();