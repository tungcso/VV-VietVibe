import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Product, ProductSchema } from './schemas/product.schema.js'; // Import vào đây
import { UsersModule } from './users/users.module.js';
import { VocabularyModule } from './vocabulary/vocabulary.module.js';
import { LoginModule } from './login/login.module.js';
import { MONGO_URI } from './config/env.js';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    // Thêm dòng này để đăng ký Model
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UsersModule,
    VocabularyModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}