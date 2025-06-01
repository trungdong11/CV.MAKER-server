import { PipeTransform, Injectable, ArgumentMetadata, ValidationPipe } from '@nestjs/common';

@Injectable()
export class EvaluateValidationPipe implements PipeTransform {
  private validationPipe: ValidationPipe;

  constructor() {
    this.validationPipe = new ValidationPipe({
      transform: true,
      whitelist: false,
      validateCustomDecorators: false,
      skipMissingProperties: true,
      skipNullProperties: true,
      skipUndefinedProperties: true,
    });
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    return this.validationPipe.transform(value, metadata);
  }
} 