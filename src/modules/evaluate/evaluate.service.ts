import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateEvaluateDto } from './dto/request/create-evaluate.dto';
import { UpdateEvaluateDto } from './dto/request/update-evaluate.dto';
import { EvaluateResDto } from './dto/response/evaluate.res.dto';
import { EvaluateEntity } from './entities/evaluate.entity';
import { EvaluateSection } from './entities/evaluate-section.entity';
import { GrammarError } from './entities/grammar-error.entity';
import { Suggestion } from './entities/suggestion.entity';
import { Uuid } from '@common/types/common.type';
import { EvaluateRepository } from './repositories/evaluate.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';

interface GrammarErrorInput {
  location?: string;
  type?: string;
  description?: string;
  suggestion?: string;
}

interface SuggestionInput {
  issue?: string;
  suggestion?: string;
}

interface SectionInput {
  section?: string;
  content_score?: number;
  final_score?: number;
  grammar_errors?: { minor: number; severe: number };
  grammar_errors_detailed?: GrammarErrorInput[];
  suggestions?: SuggestionInput[];
  quality?: string;
}

@Injectable()
export class EvaluateService {
  constructor(
    private readonly evaluateRepository: EvaluateRepository,
    private readonly dataSource: DataSource,
  ) {}

  private escapeJsonString(str: string): string {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/\f/g, '\\f');
  }

  private createSection(sectionDto: SectionInput, evaluate: EvaluateEntity): EvaluateSection {
    const section = new EvaluateSection();
    section.evaluate = evaluate;
    section.section = sectionDto.section ?? '';
    section.content_score = sectionDto.content_score ?? 0;
    section.final_score = sectionDto.final_score ?? 0;
    section.grammar_errors = sectionDto.grammar_errors ?? { minor: 0, severe: 0 };
    section.grammar_errors_detailed = sectionDto.grammar_errors_detailed?.map(error => ({
      ...error,
      description: error.description ? this.escapeJsonString(error.description) : undefined,
      suggestion: error.suggestion ? this.escapeJsonString(error.suggestion) : undefined,
    })) ?? [];
    section.suggestions = sectionDto.suggestions?.map(suggestion => ({
      ...suggestion,
      issue: suggestion.issue ? this.escapeJsonString(suggestion.issue) : undefined,
      suggestion: suggestion.suggestion ? this.escapeJsonString(suggestion.suggestion) : undefined,
    })) ?? [];
    section.quality = sectionDto.quality ?? '';
    return section;
  }

  private async saveGrammarErrors(
    section: EvaluateSection,
    grammarErrors: GrammarErrorInput[],
    transactionalEntityManager: any,
  ): Promise<void> {
    for (const errorDto of grammarErrors) {
      const error = new GrammarError();
      error.evaluate_section = section;
      error.location = errorDto.location;
      error.type = errorDto.type;
      error.description = errorDto.description ? this.escapeJsonString(errorDto.description) : undefined;
      error.suggestion = errorDto.suggestion ? this.escapeJsonString(errorDto.suggestion) : undefined;
      await transactionalEntityManager.save(GrammarError, error);
    }
  }

  private async saveSuggestions(
    section: EvaluateSection,
    suggestions: SuggestionInput[],
    transactionalEntityManager: any,
  ): Promise<void> {
    for (const suggestionDto of suggestions) {
      const suggestion = new Suggestion();
      suggestion.evaluate_section = section;
      suggestion.issue = suggestionDto.issue ? this.escapeJsonString(suggestionDto.issue) : undefined;
      suggestion.suggestion = suggestionDto.suggestion ? this.escapeJsonString(suggestionDto.suggestion) : undefined;
      await transactionalEntityManager.save(Suggestion, suggestion);
    }
  }

  async create(createEvaluateDto: CreateEvaluateDto, userId: Uuid): Promise<EvaluateResDto> {
    return this.dataSource.transaction(async transactionalEntityManager => {
      const now = new Date();
      
      const evaluate = this.evaluateRepository.create({
        total_content_score: createEvaluateDto.total_content_score ?? 0,
        total_final_score: createEvaluateDto.total_final_score ?? 0,
        content_score_100: createEvaluateDto.content_score_100 ?? 0,
        final_score_100: createEvaluateDto.final_score_100 ?? 0,
        total_grammar_errors: createEvaluateDto.total_grammar_errors ?? 0,
        created_at: now,
        updated_at: now,
        user: { id: userId } as any,
      });

      const savedEvaluate = await transactionalEntityManager.save(EvaluateEntity, evaluate);

      if (createEvaluateDto.sections?.length) {
        for (const sectionDto of createEvaluateDto.sections) {
          const section = this.createSection(sectionDto, savedEvaluate);
          const savedSection = await transactionalEntityManager.save(EvaluateSection, section);

          if (sectionDto.grammar_errors_detailed?.length) {
            await this.saveGrammarErrors(savedSection, sectionDto.grammar_errors_detailed, transactionalEntityManager);
          }
          if (sectionDto.suggestions?.length) {
            await this.saveSuggestions(savedSection, sectionDto.suggestions, transactionalEntityManager);
          }
        }
      }

      // Fetch the complete evaluate with all relations
      const completeEvaluate = await transactionalEntityManager
        .createQueryBuilder(EvaluateEntity, 'evaluate')
        .leftJoinAndSelect('evaluate.user', 'user')
        .leftJoinAndSelect('evaluate.sections', 'sections')
        .leftJoinAndSelect('sections.grammarErrors', 'grammarErrors')
        .leftJoinAndSelect('sections.suggestionsEntities', 'suggestions')
        .where('evaluate.id = :id', { id: savedEvaluate.id })
        .getOne();

      if (!completeEvaluate) {
        throw new NotFoundException(`Failed to create evaluation`);
      }

      return this.mapToDto(completeEvaluate);
    });
  }

  async findAll(userId: Uuid): Promise<EvaluateResDto[]> {
    try {
      const evaluates = await this.evaluateRepository.findEvaluatesByUserId(userId);
      return evaluates.map(evaluate => this.mapToDto(evaluate));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: Uuid, userId: Uuid): Promise<EvaluateResDto> {
    const evaluate = await this.evaluateRepository.findEvaluateByIdAndUserId(id, userId);
    if (!evaluate) {
      throw new NotFoundException(`Evaluation with ID ${id} not found or you do not have access to it`);
    }
    return this.mapToDto(evaluate);
  }

  async update(id: Uuid, updateEvaluateDto: UpdateEvaluateDto, userId: Uuid): Promise<EvaluateResDto> {
    return this.dataSource.transaction(async transactionalEntityManager => {
      const evaluate = await transactionalEntityManager
        .createQueryBuilder(EvaluateEntity, 'evaluate')
        .leftJoinAndSelect('evaluate.user', 'user')
        .where('evaluate.id = :id', { id })
        .andWhere('user.id = :userId', { userId })
        .getOne();

      if (!evaluate) {
        throw new NotFoundException(`Evaluation with ID ${id} not found or you do not have access to it`);
      }

      // Update main fields and updated_at
      if (updateEvaluateDto.name_cv !== undefined) evaluate.name_cv = updateEvaluateDto.name_cv;
      if (updateEvaluateDto.total_content_score !== undefined) evaluate.total_content_score = updateEvaluateDto.total_content_score;
      if (updateEvaluateDto.total_final_score !== undefined) evaluate.total_final_score = updateEvaluateDto.total_final_score;
      if (updateEvaluateDto.content_score_100 !== undefined) evaluate.content_score_100 = updateEvaluateDto.content_score_100;
      if (updateEvaluateDto.final_score_100 !== undefined) evaluate.final_score_100 = updateEvaluateDto.final_score_100;
      if (updateEvaluateDto.total_grammar_errors !== undefined) evaluate.total_grammar_errors = updateEvaluateDto.total_grammar_errors;
      evaluate.updated_at = new Date();

      await transactionalEntityManager.save(EvaluateEntity, evaluate);

      if (updateEvaluateDto.sections?.length) {
        const existingSections = await transactionalEntityManager.find(EvaluateSection, { where: { evaluate: { id } } });

        for (const sectionDto of updateEvaluateDto.sections) {
          const section = this.createSection(sectionDto, evaluate);
          const savedSection = await transactionalEntityManager.save(EvaluateSection, section);

          if (sectionDto.grammar_errors_detailed?.length) {
            await this.saveGrammarErrors(savedSection, sectionDto.grammar_errors_detailed, transactionalEntityManager);
          }
          if (sectionDto.suggestions?.length) {
            await this.saveSuggestions(savedSection, sectionDto.suggestions, transactionalEntityManager);
          }
        }
      }

      // Fetch the complete evaluate with all relations
      const completeEvaluate = await transactionalEntityManager
        .createQueryBuilder(EvaluateEntity, 'evaluate')
        .leftJoinAndSelect('evaluate.user', 'user')
        .leftJoinAndSelect('evaluate.sections', 'sections')
        .leftJoinAndSelect('sections.grammarErrors', 'grammarErrors')
        .leftJoinAndSelect('sections.suggestionsEntities', 'suggestions')
        .where('evaluate.id = :id', { id })
        .getOne();

      if (!completeEvaluate) {
        throw new NotFoundException(`Failed to update evaluation`);
      }

      return this.mapToDto(completeEvaluate);
    });
  }

  async remove(id: Uuid, userId: Uuid): Promise<void> {
    const evaluate = await this.evaluateRepository.findEvaluateByIdAndUserId(id, userId);
    if (!evaluate) {
      throw new NotFoundException(`Evaluation with ID ${id} not found or you do not have access to it`);
    }
    await this.evaluateRepository.deleteEvaluateByIdAndUserId(id, userId);
  }

  private mapToDto(evaluate: EvaluateEntity): EvaluateResDto {
    return plainToClass(EvaluateResDto, {
      id: evaluate.id,
      name_cv: evaluate.name_cv,
      total_content_score: evaluate.total_content_score,
      total_final_score: evaluate.total_final_score,
      content_score_100: evaluate.content_score_100,
      final_score_100: evaluate.final_score_100,
      total_grammar_errors: evaluate.total_grammar_errors,
      sections: evaluate.sections?.map(section => ({
        id: section.id,
        section: section.section,
        content_score: section.content_score,
        final_score: section.final_score,
        grammar_errors: section.grammar_errors,
        grammar_errors_detailed: section.grammarErrors?.map(error => ({
          id: error.id,
          location: error.location,
          type: error.type,
          description: error.description,
          suggestion: error.suggestion,
        })) ?? [],
        suggestions: section.suggestionsEntities?.map(suggestion => ({
          id: suggestion.id,
          issue: suggestion.issue,
          suggestion: suggestion.suggestion,
        })) ?? [],
        quality: section.quality,
      })) ?? [],
      created_at: evaluate.created_at,
      updated_at: evaluate.updated_at,
    });
  }
}