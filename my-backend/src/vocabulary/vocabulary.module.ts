import { Module } from '@nestjs/common';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [LoginModule],
  controllers: [VocabularyController],
  providers: [VocabularyService],
})
export class VocabularyModule {}
