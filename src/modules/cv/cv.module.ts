import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvController } from './controller/cv.controller';
import { CvService } from './cv.service';
import { CV } from './entities/cv.entity';
import { PersonalDetails } from './entities/personal-details.entity';
import { Social } from './entities/social.entity';
import { Education } from './entities/education.entity';
import { Award } from './entities/award.entity';
import { Language } from './entities/language.entity';
import { Skill } from './entities/skill.entity';
import { Work } from './entities/work.entity';
import { Project } from './entities/project.entity';
import { Certification } from './entities/certification.entity';
import { Publication } from './entities/publication.entity';
import { Organization } from './entities/organization.entity';
import { CvRepository } from './repositories/cv.repository';
import { EncryptionModule } from '@common/services/encryption.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CV,
      PersonalDetails,
      Social,
      Education,
      Award,
      Language,
      Skill,
      Work,
      Project,
      Certification,
      Publication,
      Organization,
    ]),
    EncryptionModule,
  ],
  controllers: [CvController],
  providers: [CvService],
  exports: [CvService],
})
export class CvModule {}