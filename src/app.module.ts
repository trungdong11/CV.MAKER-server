import { AuthModule } from '@modules//auth/auth.module';
import { FileModule } from '@modules/file/file.module';
import { HealthModule } from '@modules/health/health.module';
import { PermissionModule } from '@modules/permission/permission.module';
import { RoleModule } from '@modules/role/role.module';
import { SessionModule } from '@modules/session/session.module';
import { UserModule } from '@modules/user/user.module';
import { CvModule } from './modules/cv/cv.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import generateModulesSet from '@shared/modules-set';
import { SharedModule } from '@shared/shared.module';
import { EvaluateModule } from './modules/evaluate/evaluate.module';

const modulesGenerate = generateModulesSet();

@Module({
  imports: [
    ...modulesGenerate,
    EventEmitterModule.forRoot(),
    HealthModule,
    AuthModule,
    UserModule,
    SessionModule,
    RoleModule,
    PermissionModule,
    SharedModule,
    FileModule,
    CvModule,
    GeminiModule,
    EvaluateModule,
  ],
})
export class AppModule {}
