import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCvReqDto } from './dto/request/create-cv.req.dto';
import { UpdateCvReqDto } from './dto/request/update-cv.req.dto';
import { CvResDto, CvResListDto } from './dto/response/cv.res.dto';
import { CV } from './entities/cv.entity';
import { CvRepository } from './repositories/cv.repository';
import { Uuid } from '@common/types/common.type';
import { EncryptionService } from '@common/services/encryption.service';
import { DataSource } from 'typeorm';

@Injectable()
export class CvService {
  private readonly sensitiveFields = [
    'phone_number', 'email', 'address', 'award_title_link', 'project_link',
    'certification_link', 'credential_id', 'url', 'issued_by', 'summary',
    'degree', 'name', 'fullname', 'avatar', 'link', 'company_name', 'location',
  ];

  private readonly cvRepository: CvRepository;

  constructor(
    private readonly dataSource: DataSource,
    private readonly encryptionService: EncryptionService,
  ) {
    this.cvRepository = new CvRepository(dataSource);
  }

  private formatDate(dateStr: string): Date {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  }

  private formatDatesInObject(obj: any): any {
    if (!obj) return obj;

    const formattedObj = { ...obj };

    if (obj.personal_details) {
      formattedObj.personal_details = {
        ...obj.personal_details,
        birthday: this.formatDate(obj.personal_details.birthday),
      };
    }

    const arrayFields = ['education', 'award', 'works', 'projects', 'certification', 'publication', 'organization'];
    for (const field of arrayFields) {
      if (Array.isArray(obj[field])) {
        formattedObj[field] = obj[field].map(item => {
          const formattedItem = { ...item };
          const dateFields = ['startDate', 'endDate', 'issuedDate', 'publicationDate'];
          for (const dateField of dateFields) {
            if (item[dateField]) {
              formattedItem[dateField] = this.formatDate(item[dateField]);
            }
          }
          return formattedItem;
        });
      }
    }

    return formattedObj;
  }

  private encryptNestedObject(obj: any): any {
    if (!obj) return obj;

    const encryptedObj = { ...obj };

    for (const field of this.sensitiveFields) {
      if (obj[field] !== undefined && obj[field] !== null) {
        const value = obj[field];
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          encryptedObj[field] = this.encryptionService.encrypt(String(value));
        }
      }
    }

    if (obj.personal_details) {
      encryptedObj.personal_details = this.encryptNestedObject(obj.personal_details);
    }

    const arrayFields = ['socials', 'education', 'award', 'languages', 'skills', 'works', 'projects', 'certification', 'publication', 'organization'];
    for (const field of arrayFields) {
      if (Array.isArray(obj[field])) {
        encryptedObj[field] = obj[field].map(item => this.encryptNestedObject(item));
      }
    }

    return encryptedObj;
  }

  private decryptNestedObject(obj: any): any {
    if (!obj) return obj;

    const decryptedObj = { ...obj };

    for (const field of this.sensitiveFields) {
      if (obj[field] && typeof obj[field] === 'string') {
        try {
          decryptedObj[field] = this.encryptionService.decrypt(obj[field]);
        } catch (error) {
          console.warn(`Failed to decrypt field ${field}:`, error);
          decryptedObj[field] = obj[field];
        }
      }
    }

    if (obj.personal_details) {
      decryptedObj.personal_details = this.decryptNestedObject(obj.personal_details);
    }

    const arrayFields = ['socials', 'education', 'award', 'languages', 'skills', 'works', 'projects', 'certification', 'publication', 'organization'];
    for (const field of arrayFields) {
      if (Array.isArray(obj[field])) {
        decryptedObj[field] = obj[field].map(item => this.decryptNestedObject(item));
      }
    }

    return decryptedObj;
  }

  async create(createCvDto: CreateCvReqDto, userId: Uuid): Promise<CvResDto> {
    const now = new Date();
    const formattedData = this.formatDatesInObject({
      ...createCvDto,
      created_at: now,
      updated_at: now,
    });

    const encryptedData = this.encryptNestedObject({
      ...formattedData,
      userId,
    });

    const cv = this.cvRepository.create({
      ...encryptedData,
      user: { id: userId } as any,
    });

    const savedCv = await this.cvRepository.save(cv);
    const decryptedCv = this.decryptNestedObject(savedCv);
    return this.mapToDto(decryptedCv);
  }

  async findAll(userId: Uuid): Promise<CvResListDto[]> {
    try {
      const cvs = await this.cvRepository.findAllByUserId(userId);
      const decryptedCvs = cvs.map(cv => this.decryptNestedObject(cv));
      return decryptedCvs.map(cv => this.mapToDto(cv));
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: Uuid, userId: Uuid): Promise<CvResDto> {
    const cv = await this.cvRepository.findOneByIdAndUserId(id, userId);
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found or you do not have access to it`);
    }

    const decryptedCv = this.decryptNestedObject(cv);
    return this.mapToDto(decryptedCv);
  }

  async update(id: Uuid, updateCvDto: UpdateCvReqDto, userId: Uuid): Promise<CvResDto> {
    const cv = await this.cvRepository.findOneByIdAndUserId(id, userId);
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found or you do not have access to it`);
    }

    const formattedData = this.formatDatesInObject({
      ...updateCvDto,
      updated_at: new Date(),
    });

    const encryptedData = this.encryptNestedObject(formattedData);
    Object.assign(cv, encryptedData);

    const updatedCv = await this.cvRepository.save(cv);
    const decryptedCv = this.decryptNestedObject(updatedCv);
    return this.mapToDto(decryptedCv);
  }

  async remove(id: Uuid, userId: Uuid): Promise<void> {
    const cv = await this.cvRepository.findOneByIdAndUserId(id, userId);
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found or you do not have access to it`);
    }
    await this.cvRepository.remove(cv);
  }

  private mapToDto(cv: CV): CvResDto {
    try {
      return plainToClass(CvResDto, cv, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });
    } catch (error) {
      console.error('Error in mapToDto:', error);
      throw error;
    }
  }
}
