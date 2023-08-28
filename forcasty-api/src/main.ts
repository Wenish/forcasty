import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const adminConfig: admin.ServiceAccount = {
    projectId: configService.get('firebase.projectId'),
    privateKey: configService.get('firebase.privateKey').replace(/\\n/g, '\n'),
    clientEmail: configService.get('firebase.clientEmail'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  const config = new DocumentBuilder()
    .setTitle('forcasty-api')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors();

  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
