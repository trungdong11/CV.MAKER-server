import { GlobalExceptionFilter } from '@common/filters/global-exception.filter';
import { AuthGuard } from '@common/guards/auth.guard';
import { CamelToSnakeInterceptor } from '@common/interceptors/camel-to-snake.interceptor';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { JwtUtil } from '@common/utils/jwt.util';
import setupSwagger from '@common/utils/setup-swagger';
import { type AllConfigType } from '@config/config.type';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  RequestMethod,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  app.useLogger(app.get(Logger));

  // Setup security headers
  // app.use(helmet());

  // For high-traffic websites in production, it is strongly recommended to offload compression from the application server - typically in a reverse proxy (e.g., Nginx). In that case, you should not use compression middleware.
  app.use(compression());

  const configService = app.get(ConfigService<AllConfigType>);
  const reflector = app.get(Reflector);
  const isDevelopment =
    configService.getOrThrow('app.nodeEnv', { infer: true }) === 'development';
  const corsOrigin = configService.getOrThrow('app.corsOrigin', {
    infer: true,
  });
  const appUrl = configService.getOrThrow<string>('app.url', { infer: true });

  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  });
  console.info('CORS Origin:', corsOrigin);

  // Use global prefix if you don't have subdomain
  // TODO: (BUG) The pino logger for request will be not available when exclude the root path ('/')
  // https://github.com/iamolegga/nestjs-pino/issues/1849
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: [
        { method: RequestMethod.GET, path: '/' },
        { method: RequestMethod.GET, path: 'health' },
      ],
    },
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalGuards(new AuthGuard(reflector, app.get(JwtUtil)));
  app.useGlobalFilters(new GlobalExceptionFilter(configService));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new CamelToSnakeInterceptor(),
    new ResponseInterceptor(),
  );
  setupSwagger(app);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));

  console.info(`Server running on ${await app.getUrl()}`);
  console.log(`Api docs at: ${appUrl}/api-docs`);
  return app;
}

void bootstrap();
