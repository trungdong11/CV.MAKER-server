import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EvaluateEntity } from '../entities/evaluate.entity';
import { Uuid } from '@common/types/common.type';

@Injectable()
export class EvaluateRepository extends Repository<EvaluateEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EvaluateEntity, dataSource.createEntityManager());
  }

  async findEvaluatesByUserId(userId: Uuid): Promise<EvaluateEntity[]> {
    return this.createQueryBuilder('evaluate')
      .leftJoinAndSelect('evaluate.user', 'user')
      .leftJoinAndSelect('evaluate.sections', 'sections')
      .leftJoinAndSelect('sections.grammarErrors', 'grammarErrors')
      .leftJoinAndSelect('sections.suggestionsEntities', 'suggestions')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async findEvaluateByIdAndUserId(id: Uuid, userId: Uuid): Promise<EvaluateEntity | undefined> {
    return this.createQueryBuilder('evaluate')
      .leftJoinAndSelect('evaluate.user', 'user')
      .leftJoinAndSelect('evaluate.sections', 'sections')
      .leftJoinAndSelect('sections.grammarErrors', 'grammarErrors')
      .leftJoinAndSelect('sections.suggestionsEntities', 'suggestions')
      .where('evaluate.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();
  }

  async deleteEvaluateByIdAndUserId(id: Uuid, userId: Uuid): Promise<void> {
    await this.createQueryBuilder()
      .delete()
      .from(EvaluateEntity)
      .where('id = :id', { id })
      .andWhere('user_id = :userId', { userId })
      .execute();
  }
}