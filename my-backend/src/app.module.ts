import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product, ProductSchema } from './schemas/product.schema'; // Import vào đây

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/vietvibe_db'),
    // Thêm dòng này để đăng ký Model
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}