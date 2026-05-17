import { Module } from '@nestjs/common';
import { ListeningController } from './listening.controller';
import { ListeningService } from './listening.service';
import { LoginModule } from '../login/login.module.js';

@Module({
  imports: [LoginModule],
  controllers: [ListeningController],
  providers: [ListeningService],
})
export class ListeningModule {}
