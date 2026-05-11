import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
const mongoose = require('mongoose');
import { MONGO_URI, PORT } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors
          .map((error) => {
            const constraints = Object.values(error.constraints || {});
            return constraints
              .map((msg: string) => {
                // Translate common validation messages to Japanese
                return msg
                  .replace(/must be longer than or equal to (\d+) characters/i, '最小$1文字以上である必要があります')
                  .replace(/must be an email/i, '有効なメールアドレスである必要があります')
                  .replace(/must be a string/i, '文字列である必要があります')
                  .replace(/should not be empty/i, '空にすることはできません');
              })
              .join(', ');
          })
          .join('; ');
        return new BadRequestException(messages);
      },
    }),
  );
  
  // Bật CORS để Next.js có thể gọi API
  app.enableCors(); 

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('VietVibe API')
    .setDescription('Danh sách API cho VietVibe Project')
    .setVersion('1.0')
    .addTag('vietvibe')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
  console.log(`Swagger UI is available at: http://localhost:${PORT}/api`);
}
bootstrap();