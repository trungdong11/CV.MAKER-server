import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCvReqDto } from './dto/request/create-cv.req.dto';
import { UpdateCvReqDto } from './dto/request/update-cv.req.dto';
import { CvResDto } from './dto/response/cv.res.dto';
import { CV } from './entities/cv.entity';
import { CvRepository } from './repositories/cv.repository';
import { Uuid } from '@common/types/common.type';
import { EncryptionService } from '@common/services/encryption.service';
import { DataSource } from 'typeorm';

@Injectable()
export class CvService {
  private readonly sensitiveFields = [
    'phoneNumber',
    'email',
    'address',
    'awardTitleLink',
    'projectLink',
    'certificationLink',
    'credentialId',
    'url',
    'issuedby',
    'summary',
    'degree',
    'GPA',
    'name',
    'fullname',
    'avatar',
    'link',
    'companyName',
    'location',
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
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateStr}`);
      return null;
    }
    return date;
  }

  private formatDatesInObject(obj: any): any {
    if (!obj) return obj;
    
    const formattedObj = { ...obj };
    
    // Format dates in personalDetails
    if (obj.personalDetails) {
      formattedObj.personalDetails = {
        ...obj.personalDetails,
        birthday: this.formatDate(obj.personalDetails.birthday)
      };
    }

    // Format dates in arrays
    const arrayFields = ['education', 'award', 'works', 'projects', 'certification', 'publication', 'organization'];
    for (const field of arrayFields) {
      if (Array.isArray(obj[field])) {
        formattedObj[field] = obj[field].map(item => {
          const formattedItem = { ...item };
          const dateFields = ['startDate', 'endDate', 'issuedDate', 'publicationDate'];
          dateFields.forEach(dateField => {
            if (item[dateField]) {
              formattedItem[dateField] = this.formatDate(item[dateField]);
            }
          });
          return formattedItem;
        });
      }
    }

    return formattedObj;
  }

  private encryptNestedObject(obj: any): any {
    if (!obj) return obj;
    
    const encryptedObj = { ...obj };
    
    // Mã hóa các trường nhạy cảm ở cấp độ hiện tại
    for (const field of this.sensitiveFields) {
      if (obj[field] && typeof obj[field] === 'string') {
        encryptedObj[field] = this.encryptionService.encrypt(obj[field]);
      }
    }

    // Mã hóa các trường trong personalDetails
    if (obj.personalDetails) {
      encryptedObj.personalDetails = this.encryptNestedObject(obj.personalDetails);
    }

    // Mã hóa các mảng
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
    
    // Giải mã các trường nhạy cảm ở cấp độ hiện tại
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

    // Giải mã các trường trong personalDetails
    if (obj.personalDetails) {
      decryptedObj.personalDetails = this.decryptNestedObject(obj.personalDetails);
    }

    // Giải mã các mảng
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
    
    // Format all dates in the object
    const formattedData = this.formatDatesInObject({
      ...createCvDto,
      createdAt: now,
      updatedAt: now
    });
    

    // Mã hóa dữ liệu nhạy cảm trước khi lưu
    const encryptedData = this.encryptNestedObject({
      ...formattedData,
      userId,
    });
    

    const cv = this.cvRepository.create(encryptedData);
    const savedCv = await this.cvRepository.save(cv);
    

    // Giải mã dữ liệu trước khi trả về
    const decryptedCv = this.decryptNestedObject(savedCv);

    return this.mapToDto(decryptedCv);
  }

  async findAll(userId: Uuid): Promise<CvResDto[]> {
    try {
      const cvs = await this.cvRepository.findAllByUserId(userId);

      // Giải mã dữ liệu trước khi trả về
      const decryptedCvs = cvs.map((cv) => this.decryptNestedObject(cv));

      const mappedCvs = decryptedCvs.map(cv => this.mapToDto(cv));
      return mappedCvs;
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

    // Giải mã dữ liệu trước khi trả về
    const decryptedCv = this.decryptNestedObject(cv);
    return this.mapToDto(decryptedCv);
  }

  async update(id: Uuid, updateCvDto: UpdateCvReqDto, userId: Uuid): Promise<CvResDto> {
    const cv = await this.cvRepository.findOneByIdAndUserId(id, userId);
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found or you do not have access to it`);
    }

    // Format all dates in the object
    const formattedData = this.formatDatesInObject({
      ...updateCvDto,
      updatedAt: new Date()
    });

    // Mã hóa dữ liệu nhạy cảm trước khi cập nhật
    const encryptedData = this.encryptNestedObject(formattedData);
    Object.assign(cv, encryptedData);
    
    const updatedCv = await this.cvRepository.save(cv);

    // Giải mã dữ liệu trước khi trả về
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
      const dto = plainToClass(CvResDto, cv, { 
        excludeExtraneousValues: true,
        enableImplicitConversion: true 
      });
      return dto;
    } catch (error) {
      console.error('Error in mapToDto:', error);
      throw error;
    }
  }
}
