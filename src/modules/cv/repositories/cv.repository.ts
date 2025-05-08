import { Repository, DataSource } from 'typeorm';
import { CV } from '../entities/cv.entity';
import { Uuid } from '@common/types/common.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CvRepository extends Repository<CV> {
  constructor(private readonly dataSource: DataSource) {
    super(CV, dataSource.createEntityManager());
  }

  async findAllByUserId(userId: Uuid): Promise<CV[]> {
    try {
      const queryBuilder = this.createQueryBuilder('cv')
        .leftJoinAndSelect('cv.personalDetails', 'personalDetails')
        .leftJoinAndSelect('cv.socials', 'socials')
        .leftJoinAndSelect('cv.education', 'education')
        .leftJoinAndSelect('cv.award', 'award')
        .leftJoinAndSelect('cv.languages', 'languages')
        .leftJoinAndSelect('cv.skills', 'skills')
        .leftJoinAndSelect('cv.works', 'works')
        .leftJoinAndSelect('cv.projects', 'projects')
        .leftJoinAndSelect('cv.certification', 'certification')
        .leftJoinAndSelect('cv.publication', 'publication')
        .leftJoinAndSelect('cv.organization', 'organization')
        .where('cv.userId = :userId', { userId });

      const cvs = await queryBuilder.getMany();
      return cvs;
    } catch (error) {
      throw error;
    }
  }

  async findOneByIdAndUserId(id: string, userId: Uuid): Promise<CV> {
    try {
      const queryBuilder = this.createQueryBuilder('cv')
        .leftJoinAndSelect('cv.personalDetails', 'personalDetails')
        .leftJoinAndSelect('cv.socials', 'socials')
        .leftJoinAndSelect('cv.education', 'education')
        .leftJoinAndSelect('cv.award', 'award')
        .leftJoinAndSelect('cv.languages', 'languages')
        .leftJoinAndSelect('cv.skills', 'skills')
        .leftJoinAndSelect('cv.works', 'works')
        .leftJoinAndSelect('cv.projects', 'projects')
        .leftJoinAndSelect('cv.certification', 'certification')
        .leftJoinAndSelect('cv.publication', 'publication')
        .leftJoinAndSelect('cv.organization', 'organization')
        .where('cv.id = :id', { id })
        .andWhere('cv.userId = :userId', { userId });

      const cv = await queryBuilder.getOne();
      return cv;
    } catch (error) {
      throw error;
    }
  }
}