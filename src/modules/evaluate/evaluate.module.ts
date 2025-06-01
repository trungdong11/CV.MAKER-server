import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluateController } from './controller/evaluate.controller';
import { EvaluateService } from './evaluate.service';
import { EvaluateRepository } from './repositories/evaluate.repository';
import { EvaluateEntity } from './entities/evaluate.entity';
import { EvaluateSection } from './entities/evaluate-section.entity';
import { GrammarError } from './entities/grammar-error.entity';
import { Suggestion } from './entities/suggestion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EvaluateEntity,
      EvaluateSection,
      GrammarError,
      Suggestion,
    ]),
  ],
  controllers: [EvaluateController],
  providers: [EvaluateService, EvaluateRepository],
  exports: [EvaluateService],
})
export class EvaluateModule {}