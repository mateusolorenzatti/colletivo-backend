import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  // Load all application modules
  const app = await NestFactory.create(AppModule)

  // Pipes and Interceptors
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: false
  }))
  app.useGlobalInterceptors(new TransformInterceptor())

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Colletivo API')
    .setDescription('Auto-generated API`s documentation')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // Start server
  await app.listen(process.env.PORT || 3000)
}
bootstrap();
