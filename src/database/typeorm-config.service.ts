import TypeOrmCustomLogger from '@common/utils/typeorm-custom-logger';
import { AllConfigType } from '@config/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CV } from '@modules/cv/entities/cv.entity';
import { PersonalDetails } from '@modules/cv/entities/personal-details.entity';
import { Social } from '@modules/cv/entities/social.entity';
import { Education } from '@modules/cv/entities/education.entity';
import { Award } from '@modules/cv/entities/award.entity';
import { Language } from '@modules/cv/entities/language.entity';
import { Skill } from '@modules/cv/entities/skill.entity';
import { Work } from '@modules/cv/entities/work.entity';
import { Project } from '@modules/cv/entities/project.entity';
import { Certification } from '@modules/cv/entities/certification.entity';
import { Publication } from '@modules/cv/entities/publication.entity';
import { Organization } from '@modules/cv/entities/organization.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { PermissionEntity } from '@modules/permission/entities/permission.entity';
import { SessionEntity } from '@modules/session/entities/session.entity';
import { RoleEntity } from '@modules/role/entities/role.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type', { infer: true }),
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.username', { infer: true }),
      password: this.configService.get('database.password', { infer: true }),
      database: this.configService.get('database.name', { infer: true }),
      synchronize: this.configService.get('database.synchronize', {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      logger: TypeOrmCustomLogger.getInstance(
        'default',
        this.configService.get('database.logging', { infer: true })
          ? ['error', 'warn', 'query', 'schema']
          : ['error', 'warn'],
      ),
      entities: [
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
        UserEntity,
        PermissionEntity,
        SessionEntity,
        RoleEntity
      ],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      autoLoadEntities: false,
      poolSize: this.configService.get('database.maxConnections', {
        infer: true,
      }),
      ssl: this.configService.get('database.sslEnabled', { infer: true })
        ? {
            rejectUnauthorized: this.configService.get(
              'database.rejectUnauthorized',
              { infer: true },
            ),
            ca:
              this.configService.get('database.ca', { infer: true }) ??
              undefined,
            key:
              this.configService.get('database.key', { infer: true }) ??
              undefined,
            cert:
              this.configService.get('database.cert', { infer: true }) ??
              undefined,
          }
        : undefined,
    } as TypeOrmModuleOptions;
  }
}
