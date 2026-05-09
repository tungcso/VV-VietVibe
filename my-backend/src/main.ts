import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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
  
  // Bạn có thể đổi cổng thành 3001 để không trùng với Next.js
  await app.listen(3001); 
  console.log(`Application is running on: http://localhost:3001`);
  console.log(`Swagger UI is available at: http://localhost:3001/api`);
}
bootstrap();