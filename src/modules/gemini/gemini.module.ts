import { Module } from '@nestjs/common';
import { GeminiController } from './controller/gemini.controller';
import { GeminiService } from './gemini.service';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService],
})
export class GeminiModule {}