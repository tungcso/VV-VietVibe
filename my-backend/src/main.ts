import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Bật CORS để Next.js có thể gọi API
  app.enableCors(); 
  
  // Bạn có thể đổi cổng thành 3001 để không trùng với Next.js
  await app.listen(3001); 
}
bootstrap();